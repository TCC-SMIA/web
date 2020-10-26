import React, { useEffect, useState } from 'react';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router';

import emptyListSvg from '../../assets/empty-list.svg';
import emptyImageSvg from '../../assets/empty-image.svg';

import api from '../../services/api';
import IComplaint from '../../entities/Complaint';

import {
  Container,
  MapContainer,
  ComplaintContainer,
  ErrorContainer,
  AvatarContainer,
  Description,
  CommentsContainer,
} from './styles';

const Complaint: React.FC = () => {
  const { id } = useParams();

  const [complaint, setComplaint] = useState<IComplaint>({
    id: 'ba73e575-adef-46b3-a975-d3dbfed0b862',
    user_id: 'e80096df-e0aa-43fe-a379-41f2cf6f3a1c',
    title: 'Tartatura Morte',
    description: 'Tartaruga encontrada na praia grande em arraial do cabo',
    resolved: false,
    date: new Date('2020-09-29T18:00:00.000'),
    latitude: -22.96974,
    longitude: -42.03521,
    city: 'Arraial do Cabo',
    state: 'Rio de Janeiro',
    anonymous: false,
    user: {
      id: 'e80096df-e0aa-43fe-a379-41f2cf6f3a1c',
      name: 'Gabriel Portugal',
      user_type: 0,
      nickname: 'gabrielportugal',
      email: 'gabrielrportugal@outlook.com',
      avatar: '47f1ac02c8c2c543e3df-profile.jpeg',
      avatar_url:
        'http://localhost:3333/files/47f1ac02c8c2c543e3df-profile.jpeg',
    },
    image_url: 'http://localhost:3333/files/4cd01c61cdf1c98ac755-1267287.jpg',
  });

  useEffect(() => {
    api.get<IComplaint>(`/complaint/${id}`).then((response) => {
      setComplaint(response.data);
    });
  }, [id]);

  return (
    <Container>
      {complaint ? (
        <>
          <MapContainer>
            <Map
              doubleClickZoom
              center={[complaint.latitude, complaint.longitude]}
              zoom={15}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[complaint.latitude, complaint.longitude]} />
            </Map>
          </MapContainer>
          <ComplaintContainer>
            <AvatarContainer>
              {complaint.anonymous && (
                <>
                  <img
                    src="https://api.adorable.io/avatars/285/abott@adorable.png"
                    alt="avatar"
                  />
                  <p>Anônimo</p>
                </>
              )}
              {!complaint.anonymous && (
                <>
                  <img
                    src={
                      complaint.user.avatar_url ||
                      'https://api.adorable.io/avatars/285/abott@adorable.png'
                    }
                    alt="avatar"
                  />
                  <p>{complaint.user.name}</p>
                </>
              )}
            </AvatarContainer>
            <Description>
              <p>{complaint.description}</p>
            </Description>
            <img src={complaint.image_url || emptyImageSvg} alt="default" />
            <hr color="#d3d3d3" />
            <CommentsContainer>
              <h1>Comentários</h1>
              <p>Este é um comentário</p>
            </CommentsContainer>
          </ComplaintContainer>
        </>
      ) : (
        <ErrorContainer>
          <img src={emptyListSvg} alt="Lista Vazia" />
          <h1>Nenhuma denúncia encontrada.</h1>
        </ErrorContainer>
      )}
    </Container>
  );
};

export default Complaint;
