import React, { useState, useCallback, useEffect, FormEvent } from 'react';

import Switch from 'react-switch';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import Dropzone from '../../components/Dropzone';
import { Container, Header, Option, OptionMap } from './styles';

const Report: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  async function handleSubmit(event: FormEvent): Promise<void> {
    try {
      event.preventDefault();

      const [latitude, longitude] = selectedPosition;

      const data = new FormData();

      data.append('title', title);
      data.append('description', description);
      data.append('date', String(new Date()));
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('anonymous', anonymous ? '1' : '0');
      data.append('image', 'imageURL');

      // await api.post('complaints', data);

      console.log(data);

      toast.success('Relato criado com sucesso');

      navigate('/dashboard');
    } catch (err) {
      toast.error('Houve um erro ao tentar criar este relato.');
    }
  }

  const handleChangeTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleChangeDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const handleAnonymousSwitch = useCallback(() => {
    setAnonymous(!anonymous);
  }, [anonymous]);

  return (
    <Container>
      <Header>
        <h1>Relatar</h1>
      </Header>
      <hr color="#d3d3d3" />
      <form>
        <Option>
          <p>Título do relato</p>
          <input
            onChange={(event) => handleChangeTitle(event)}
            placeholder=""
            name="titulo do relato"
          />
        </Option>

        <Dropzone onFileUploaded={setSelectedFile} />

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
            center={initialPosition}
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
        <textarea onChange={(event) => handleChangeDescription(event)} />

        <hr color="#d3d3d3" />
        <footer>
          <button type="submit" onClick={handleSubmit}>
            Publicar
          </button>
        </footer>
      </form>
    </Container>
  );
};

export default Report;
