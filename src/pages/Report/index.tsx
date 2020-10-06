import React, { useState, useCallback, useEffect } from 'react';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { Container, Header, Option, OptionMap } from './styles';

const Report: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data = {
        title,
        description,
      };

      console.log(data);
    },
    [description, title],
  );

  const handleChangeTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleChangeDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  return (
    <Container>
      <Header>
        <h1>Relatar</h1>
      </Header>
      <hr color="#d3d3d3" />
      <form>
        <Option>
          <p>Adicione a imagem</p>
          <button type="submit">Adicionar</button>
        </Option>

        <Option>
          <p>Localização</p>
        </Option>

        <OptionMap>
          <Map center={initialPosition} zoom={20} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>
        </OptionMap>

        <Option>
          <p>Título do relato</p>
          <input
            onChange={(event) => handleChangeTitle(event)}
            placeholder=""
            name="titulo do relato"
          />
        </Option>

        <Option>
          <p>Deseja publicar como anônimo</p>
        </Option>

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
