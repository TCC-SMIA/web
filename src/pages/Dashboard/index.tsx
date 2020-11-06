import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';

import { Container, Feed, SearchSelect, SearchContainer } from './styles';

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

  useEffect(() => {
    api.get('/complaints', { params: { take: 15 } }).then((response) => {
      setComplaints(response.data);
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

  const filterComplaints = useCallback((city: string) => {
    api
      .get('/complaints', { params: { city, skip: 0, take: 15 } })
      .then((response) => {
        setComplaints(response.data);
      });
  }, []);

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedUf(event.target.value);
    },
    [],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedCity(event.target.value);
      filterComplaints(event.target.value);
    },
    [filterComplaints],
  );

  return (
    <Container>
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
    </Container>
  );
};

export default Dashboard;
