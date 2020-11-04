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
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [complaint, setComplaint] = useState<IComplaint>({} as IComplaint);

  useEffect(() => {
    api.get<IComplaint>(`/complaints/${id}`).then((response) => {
      setComplaint(response.data);
    });
  }, [id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, [complaint]);

  return (
    <Container>
      {complaint ? (
        <>
          <MapContainer>
            <Map
              doubleClickZoom
              center={[
                complaint?.latitude || initialPosition[0],
                complaint?.longitude || initialPosition[1],
              ]}
              zoom={15}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  complaint?.latitude || initialPosition[0],
                  complaint?.longitude || initialPosition[1],
                ]}
              />
            </Map>
          </MapContainer>
          <ComplaintContainer>
            <AvatarContainer>
              {complaint?.anonymous && (
                <>
                  <img
                    src="https://api.adorable.io/avatars/285/abott@adorable.png"
                    alt="avatar"
                  />
                  <p>Anônimo</p>
                </>
              )}
              {!complaint?.anonymous && (
                <>
                  <img
                    src={
                      complaint?.user?.avatar_url ||
                      'https://api.adorable.io/avatars/285/abott@adorable.png'
                    }
                    alt="avatar"
                  />
                  <p>{complaint?.user?.name}</p>
                </>
              )}
            </AvatarContainer>
            <Description>
              <p>{complaint?.description}</p>
            </Description>
            <img src={complaint?.image_url || emptyImageSvg} alt="default" />
            <hr color="#d3d3d3" />
            <CommentsContainer>
              <h1>Comentários</h1>
              {complaint?.comments &&
                complaint?.comments.map((comment) => <p>{comment.content}</p>)}
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
