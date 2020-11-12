import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';

import EmptyDashboardSVG from '../../assets/empty-dashboard.svg';

import {
  Container,
  Feed,
  SearchSelect,
  SearchContainer,
  EmptyContainer,
} from './styles';
import Loader from '../../components/Loader';

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
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);

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

  const filterComplaints = useCallback((state?: string, city?: string) => {
    if (state && city) {
      api
        .get('/complaints', { params: { city, state, skip: 0, take: 15 } })
        .then((response) => {
          setComplaints(response.data);
        });
    }
    if (state) {
      api
        .get('/complaints', { params: { state, skip: 0, take: 15 } })
        .then((response) => {
          setComplaints(response.data);
        });
    }
  }, []);

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

  return (
    <Container>
      {loading && <Loader />}
      {complaints.length === 0 && !loading && (
        <EmptyContainer>
          <h2>Não encontramos denúncias criadas.</h2>
          <img src={EmptyDashboardSVG} alt="Lista de mensagens vazia" />
        </EmptyContainer>
      )}
      {complaints.length > 0 && !loading && (
        <>
          <SearchContainer>
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
          </SearchContainer>
          <Feed>
            {complaints?.map((complaint) => (
              <Card key={complaint.id} complaint={complaint} />
            ))}
          </Feed>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
