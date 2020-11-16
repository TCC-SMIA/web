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
  Title,
  CommentsContainer,
  CommentItem,
} from './styles';
import { RANDOM_AVATAR } from '../../utils/constants';

const Complaint: React.FC = () => {
  const { id } = useParams();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [complaint, setComplaint] = useState<IComplaint>({} as IComplaint);

  useEffect(() => {
    const getComplaintData = async (): Promise<void> => {
      await api.get<IComplaint>(`/complaints/${id}`).then((response) => {
        setComplaint(response.data);
      });
    };
    getComplaintData();
  }, [id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });

    console.log(complaint);
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
              {complaint.anonymous && (
                <>
                  <img src={RANDOM_AVATAR} alt="avatar" />
                  <p>Anônimo</p>
                </>
              )}
              {!complaint.anonymous && (
                <>
                  <img
                    src={complaint?.user?.avatar_url || RANDOM_AVATAR}
                    alt="avatar"
                  />
                  <p>{complaint?.user?.name}</p>
                </>
              )}
            </AvatarContainer>
            <Title>
              <p>{complaint.title}</p>
            </Title>
            <Description>
              <p>{complaint?.description}</p>
            </Description>
            <img src={complaint?.image_url || emptyImageSvg} alt="default" />
            <CommentsContainer>
              <h1>Comentários</h1>
              {complaint.comments &&
                complaint.comments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <img src={RANDOM_AVATAR} alt="default" />
                    <p>{comment.content}</p>
                  </CommentItem>
                ))}
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
