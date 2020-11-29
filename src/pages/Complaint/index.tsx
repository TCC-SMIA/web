import React, { useCallback, useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
import { FiCheck, FiSend } from 'react-icons/fi';

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
  ButtonSend,
  CreateComment,
  LoadingItem,
} from './styles';
import { RANDOM_AVATAR } from '../../utils/constants';
import { IComment } from '../../entities/Comment';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader';

interface ICreateCommentRequestParams {
  complaint_id: string;
  content: string;
}

const Complaint: React.FC = () => {
  const { id } = useParams();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [complaint, setComplaint] = useState<IComplaint>({} as IComplaint);
  const [comments, setComments] = useState<IComment[]>([]);
  const [inputComment, setInputComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get<IComplaint>(`/complaints/${id}`).then((response) => {
      setComplaint(response.data);
    });
  }, [id]);

  useEffect(() => {
    setLoadingComments(true);
    try {
      if (complaint.id) {
        api
          .get<IComment[]>(`/comments`, {
            params: { complaint_id: complaint.id },
          })
          .then((response) => {
            setComments(response.data);
            setLoadingComments(false);
          });
      }
    } catch (error) {
      setLoadingComments(false);
    }
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

  const handleCreateComment = useCallback(
    (event) => {
      event.preventDefault();
      if (!loading) {
        setLoading(true);

        if (!inputComment) {
          setLoading(false);
          return;
        }

        api
          .post('/comments', {
            complaint_id: complaint.id,
            content: inputComment,
          } as ICreateCommentRequestParams)
          .then((response) => {
            setComments([...comments, response.data]);
            setLoading(false);
            setInputComment('');
          });
      }
    },
    [comments, complaint.id, inputComment, loading],
  );

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
              <CreateComment>
                {loading && <Loader />}
                <form onSubmit={(event) => handleCreateComment(event)}>
                  <input
                    type="text"
                    placeholder="Digite um comentário"
                    value={inputComment}
                    onChange={(e) => setInputComment(e.target.value)}
                  />
                  <ButtonSend type="submit">
                    <FiSend color="white" size={20} />
                  </ButtonSend>
                </form>
              </CreateComment>
              {loadingComments && (
                <LoadingItem key="loading-comment">
                  <Loader />
                </LoadingItem>
              )}
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
