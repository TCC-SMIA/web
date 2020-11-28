import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useMemo,
} from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FiFilter } from 'react-icons/fi';

import api from '../../services/api';
import Card from '../../components/Card';
import socket from '../../services/socket/socket';
import IComplaint, { ComplaintStatusEnum } from '../../entities/Complaint';

import EmptyDashboardSVG from '../../assets/empty-dashboard.svg';
import Loader from '../../components/Loader';
import ModalFilter from './components/ModalFilter';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Feed,
  SearchSelect,
  FilterContainer,
  EmptyContainer,
} from './styles';
import { COMPLAINT_STATUS } from '../../utils/constants';
import Resume from '../../components/Resume';

interface IBGECityResponse {
  nome: string;
}

interface IBGEUFResponse {
  sigla: string;
}

const Dashboard: React.FC = () => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [complaintTypes, setComplaintTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    socket.subscribeToComplaintsFeed((data: IComplaint[]) => {
      setComplaints(data);
    });
  }, [user]);

  useEffect(() => {
    api.get('/complaints', { params: { take: 15 } }).then((response) => {
      setComplaints(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    api
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '') return;

    api
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    api.get('/complaints/types').then((response) => {
      setComplaintTypes(response.data.complaint_types);
    });
  }, []);

  const filterComplaints = useCallback(
    (state?: string, city?: string, type?: string, status?: string) => {
      api
        .get('/complaints', {
          params: {
            city,
            state,
            type,
            status,
            skip: 0,
            take: 15,
          },
        })
        .then((response) => {
          setComplaints(response.data);
        });
    },
    [],
  );

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedUf(event.target.value);
      filterComplaints(event.target.value);
    },
    [filterComplaints],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedCity(event.target.value);
      filterComplaints(selectedUf, event.target.value);
    },
    [filterComplaints, selectedUf],
  );

  const handleSelectType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedType(event.target.value);
      filterComplaints(
        selectedUf,
        selectedCity,
        event.target.value,
        selectedStatus,
      );
    },
    [filterComplaints, selectedCity, selectedUf, selectedStatus],
  );

  const handleSelectStatus = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedStatus(event.target.value);
      filterComplaints(
        selectedUf,
        selectedCity,
        selectedType,
        event.target.value,
      );
    },
    [filterComplaints, selectedCity, selectedUf, selectedType],
  );

  const complaintsInProgress = useMemo(() => {
    const quantityInProgress = complaints.filter(
      (complaint) => complaint.status === ComplaintStatusEnum.InProgress,
    ).length;

    return quantityInProgress;
  }, [complaints]);

  const complaintsResolved = useMemo(() => {
    const quantityResolved = complaints.filter(
      (complaint) => complaint.status === ComplaintStatusEnum.Resolved,
    ).length;

    return quantityResolved;
  }, [complaints]);

  return (
    <Container>
      {!loading && (
        <>
          <Resume
            all={complaints.length}
            inProgress={complaintsInProgress}
            resolved={complaintsResolved}
          />
          <FilterContainer>
            <Button onClick={() => setModalFilterVisible(!modalFilterVisible)}>
              <FiFilter />
              Filtrar denúncias
            </Button>
          </FilterContainer>
        </>
      )}
      {loading && <Loader />}

      {complaints.length === 0 && !loading && (
        <EmptyContainer>
          <h2>Não encontramos relatos criados.</h2>
          <img src={EmptyDashboardSVG} alt="Lista de mensagens vazia" />
        </EmptyContainer>
      )}

      {complaints.length > 0 && !loading && (
        <>
          <Feed>
            {complaints?.map((complaint) => (
              <Card key={complaint.id} complaint={complaint} />
            ))}
          </Feed>
        </>
      )}
      {modalFilterVisible && (
        <ModalFilter
          onClose={() => {
            setModalFilterVisible(!modalFilterVisible);
          }}
        >
          <SearchSelect>
            <select
              name="uf"
              id="uf"
              onChange={handleSelectUf}
              value={selectedUf}
            >
              <option value="0">Selecione uma UF</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
            <IoIosArrowDown />
          </SearchSelect>
          <SearchSelect>
            <select
              name="city"
              id="city"
              onChange={handleSelectCity}
              value={selectedCity}
            >
              <option value="0">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <IoIosArrowDown />
          </SearchSelect>
          <SearchSelect>
            <select
              name="type"
              id="type"
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
          <SearchSelect>
            <select
              name="type"
              id="type"
              onChange={handleSelectStatus}
              value={selectedStatus}
            >
              <option value="0">Selecione um status</option>
              {COMPLAINT_STATUS.map((statusType) => (
                <option key={statusType} value={statusType}>
                  {statusType}
                </option>
              ))}
            </select>
            <IoIosArrowDown />
          </SearchSelect>
          <Button onClick={() => setModalFilterVisible(!modalFilterVisible)}>
            Aplicar filtros
          </Button>
        </ModalFilter>
      )}
    </Container>
  );
};

export default Dashboard;
