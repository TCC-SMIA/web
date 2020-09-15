import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { Container, Feed, SearchSelect, SearchContainer } from './styles';
import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';

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
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    api.get('/complaints').then((response) => {
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
    if (selectedUf === '0') return;

    api
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedUf(event.target.value);
    },
    [],
  );

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedCity(event.target.value);
  }

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
