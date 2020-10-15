import React from 'react';

import { FiX } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { Container, MapContainer, TitleContainer } from './styles';

interface ModalMapProps {
  initialPosition: [number, number];
  selectedPosition: [number, number];
  onClose(): void;
  handleMapClick(event: LeafletMouseEvent): void;
}

const ModalMap: React.FC<ModalMapProps> = ({
  initialPosition,
  selectedPosition,
  handleMapClick,
  onClose,
}) => {
  return (
    <Container>
      <TitleContainer>
        <h1>Marque a localização no mapa</h1>
        <button type="button" onClick={onClose}>
          <FiX />
        </button>
      </TitleContainer>
      <MapContainer>
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
      </MapContainer>
    </Container>
  );
};

export default ModalMap;
