import React, {
  useState,
  useCallback,
  useEffect,
  FormEvent,
  ChangeEvent,
} from 'react';

import Switch from 'react-switch';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useNavigate, useParams } from 'react-router';
import { IoIosArrowDown, IoIosCamera } from 'react-icons/io';

import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Option,
  OptionMap,
  SearchSelect,
  ImageContainer,
} from './styles';
import api from '../../services/api';
import Button from '../../components/Button';
import IComplaint from '../../entities/Complaint';
import { RANDOM_COMPLAINT_IMAGE } from '../../utils/constants';
import Loader from '../../components/Loader';

const Report: React.FC = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [complaintDate, setComplaintDate] = useState<Date>();
  const [complaintImage, setComplaintImage] = useState<string>();
  const [complaintTypes, setComplaintTypes] = useState<string[]>();
  const [selectedType, setselectedType] = useState('');

  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    try {
      setLoadingPage(true);
      api.get<IComplaint>(`/complaints/${id}`).then((response) => {
        setTitle(response.data.title);
        setComplaintDate(response.data.date);
        setDescription(response.data.description);
        setAnonymous(response.data.anonymous);
        setselectedType(response.data.type);
        setSelectedPosition([response.data.latitude, response.data.longitude]);
        setComplaintImage(response.data.image_url);
        setLoadingPage(false);
      });
    } catch (error) {
      setLoadingPage(false);
    }
  }, [id]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/complaints/types').then((response) => {
      setComplaintTypes(response.data.complaint_types);
    });
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      setLoading(true);

      if (title === '') {
        setLoading(false);
        throw new Error('Titulo não pode estar vazio.');
      }

      if (description === '') {
        setLoading(false);
        throw new Error('Descrição não pode estar vazia.');
      }

      const [latitude, longitude] = selectedPosition;

      // TODO : Inserir tipo de denúncia na edição

      await api.put('/complaints/update', {
        complaint_id: id,
        title,
        description,
        latitude,
        longitude,
        anonymous,
        complaintDate,
      });

      toast.success('Relato editado com sucesso');

      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      if (err.message) {
        toast.error(err.message);
        return;
      }
      toast.error('Houve um erro ao tentar criar este relato.');
    }
  }

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      try {
        setLoadingImage(true);
        if (event.target.files) {
          const data = new FormData();

          data.append('complaint_id', id);
          data.append('image', event.target.files[0]);

          api.patch('/complaints/image', data).then((response) => {
            setComplaintImage(response.data.image_url);
            setLoadingImage(false);
            toast.success('Imagem atualizada com sucesso.');
          });
        }
      } catch (error) {
        toast.error('Não foi possível atualizar a imagem.');
        setLoadingImage(false);
      }
    },
    [id],
  );

  const handleChangeTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleChangeDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const handleAnonymousSwitch = useCallback(() => {
    setAnonymous(!anonymous);
  }, [anonymous]);

  const handleSelectType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setselectedType(event.target.value);
    },
    [],
  );

  return (
    <>
      {loadingPage && <Loader />}
      {!loadingPage && (
        <Container>
          <>
            <Header>
              <h1>Editar Relato</h1>
            </Header>
            <hr color="#d3d3d3" />
            <form>
              <Option>
                <p>Título do relato</p>
                <input
                  onChange={(event) => handleChangeTitle(event)}
                  value={title}
                  placeholder=""
                  name="titulo do relato"
                />
              </Option>

              {!!complaintTypes && (
                <Option>
                  <p>Tipo do relato</p>
                  <SearchSelect>
                    <select
                      name="uf"
                      id="uf"
                      onChange={handleSelectType}
                      value={selectedType}
                    >
                      <option value="0">Selecione um tipo</option>
                      {complaintTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <IoIosArrowDown />
                  </SearchSelect>
                </Option>
              )}

              <ImageContainer>
                <img
                  src={complaintImage || RANDOM_COMPLAINT_IMAGE}
                  alt="default"
                />
                <label htmlFor="image">
                  <IoIosCamera />
                  Atualizar imagem
                  <input
                    type="file"
                    name=""
                    id="image"
                    onChange={handleImageChange}
                  />
                </label>
                {loadingImage && <Loader />}
              </ImageContainer>

              <Option>
                <p>Deseja publicar como anônimo</p>
                <Switch
                  onChange={() => handleAnonymousSwitch()}
                  onColor="#426d49"
                  offColor="#777"
                  checked={anonymous}
                />
              </Option>

              <Option>
                <p>Localização</p>
              </Option>

              <OptionMap>
                <Map
                  doubleClickZoom
                  center={selectedPosition}
                  zoom={15}
                  onClick={handleMapClick}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={selectedPosition} />
                </Map>
              </OptionMap>

              <Option>
                <p>Descrição do relato</p>
              </Option>
              <textarea
                value={description}
                onChange={(event) => handleChangeDescription(event)}
              />

              <hr color="#d3d3d3" />
              <footer>
                <Button loading={loading} type="submit" onClick={handleSubmit}>
                  Salvar
                </Button>
              </footer>
            </form>
          </>
        </Container>
      )}
    </>
  );
};

export default Report;
