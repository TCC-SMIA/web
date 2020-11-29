import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
import { FiCheck } from 'react-icons/fi';

import emptyListSvg from '../../assets/empty-list.svg';
import emptyImageSvg from '../../assets/empty-image.svg';
import socket from '../../services/socket/socket';

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
  Header,
  StatusContainer,
  CommentAvatarContainer,
} from './styles';
import { RANDOM_AVATAR } from '../../utils/constants';
import { IComment } from '../../entities/Comment';
import { useAuth } from '../../hooks/useAuth';

const Complaint: React.FC = () => {
  const { id } = useParams();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [complaint, setComplaint] = useState<IComplaint>({} as IComplaint);
  const [comments, setComments] = useState<IComment[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get<IComplaint>(`/complaints/${id}`).then((response) => {
      setComplaint(response.data);
    });
  }, [id]);

  useEffect(() => {
    if (complaint.id)
      api
        .get<IComment[]>(`/comments`, {
          params: { complaint_id: complaint.id },
        })
        .then((response) => {
          setComments(response.data);
        });
  }, [complaint]);

  useEffect(() => {
    socket.subscribeToComplaintCommentsChannel((data: IComment[]) => {
      setComments(data);
    });
  }, [user]);

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
            <Header>
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
              <StatusContainer>
                {complaint.resolved && (
                  <span>
                    Resolvido <FiCheck />
                  </span>
                )}
              </StatusContainer>
            </Header>
            <Title>
              <p>{complaint.title}</p>
            </Title>
            <Description>
              <p>{complaint?.description}</p>
            </Description>
            <img src={complaint?.image_url || emptyImageSvg} alt="default" />
            <CommentsContainer>
              <h1>Comentários</h1>
              {comments &&
                comments.length > 0 &&
                comments.map((comment: IComment) => (
                  <CommentItem
                    key={comment.id}
                    onClick={() => navigate(`/profile/${comment.user_id}`)}
                  >
                    <CommentAvatarContainer>
                      <img
                        src={comment.user.avatar_url || RANDOM_AVATAR}
                        alt="default"
                      />
                      <h5>{comment.user.name}</h5>
                    </CommentAvatarContainer>
                    <div>
                      <p>{comment.content}</p>
                    </div>
                    <span>{format(new Date(comment.date), 'dd/MM HH:mm')}</span>
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
