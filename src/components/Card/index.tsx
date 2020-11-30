/* eslint-disable import/no-duplicates */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdPin } from 'react-icons/io';
import { FiSend, FiTrash, FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import IComplaint from '../../entities/Complaint';
import { RANDOM_AVATAR, RANDOM_COMPLAINT_IMAGE } from '../../utils/constants';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { ButtonSend } from '../../pages/Messages/styles';
import Modal from './Modal';
import Loader from '../Loader';

import {
  Container,
  Header,
  AvatarContainer,
  Title,
  Description,
  Options,
  AddComentContainer,
  IconsContainer,
  ImageContainer,
  ComplaintStatus,
} from './styles';

import {
  CommentItem,
  CommentAvatarContainer,
} from '../../pages/Complaint/styles';

import { IComment } from '../../entities/Comment';
import socket from '../../services/socket/socket';

interface ICreateCommentRequestParams {
  complaint_id: string;
  content: string;
}
interface ICreateChatRequestParams {
  contact_id: string;
}
interface ICardProps {
  complaint: IComplaint;
}

const Card: React.FC<ICardProps> = ({ complaint }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [complaintToBeDeleted, setComplaintToBeDeleted] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCreateChat, setLoadingCreateChat] = useState(false);
  const [loadingFetchComments, setLoadingFetchComments] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    socket.subscribeToComplaintCommentsChannel((data: IComment[]) => {
      if (complaint.id === data[0].complaint_id)
        setComments(data.slice(data.length - 3, data.length));
    });
  }, [complaint]);

  const handleCreateChatWithReporter = useCallback(
    (user_id) => {
      try {
        if (!loadingCreateChat) {
          setLoadingCreateChat(true);
          api
            .post('/chats', {
              contact_id: user_id,
            } as ICreateChatRequestParams)
            .then(() => {
              navigate('/messages');
              setLoadingCreateChat(false);
            });
        }
      } catch (error) {
        setLoadingCreateChat(false);
      }
    },
    [loadingCreateChat, navigate],
  );

  const handleCreateComment = useCallback(
    (event) => {
      event.preventDefault();
      if (!loading) {
        setLoading(true);

        if (!inputMessage) {
          setLoading(false);
          return;
        }

        api
          .post('/comments', {
            complaint_id: complaint.id,
            content: inputMessage,
          } as ICreateCommentRequestParams)
          .then(() => {
            setLoading(false);
            setInputMessage('');
          });
      }
    },
    [complaint.id, inputMessage, loading],
  );

  const handleDeleteComplaint = useCallback((complaint_id: string) => {
    setComplaintToBeDeleted(complaint_id);
  }, []);

  const handleFetchComments = useCallback(async () => {
    try {
      setLoadingFetchComments(true);
      if (comments.length > 0) setComments([]);

      if (complaint && complaint.id && comments.length === 0)
        await api
          .get<IComment[]>(`/comments`, {
            params: { complaint_id: complaint.id },
          })
          .then((response) => {
            const threeComments = response.data.slice(
              response.data.length - 3,
              response.data.length,
            );
            setComments(threeComments);
            setLoadingFetchComments(false);
          });
    } catch (error) {
      setLoadingFetchComments(false);
    }
  }, [complaint, comments]);

  return (
    <Container>
      <Modal show={complaintToBeDeleted} close={handleDeleteComplaint} />
      <Header>
        <AvatarContainer>
          {complaint.anonymous && (
            <Link
              to="/"
              style={{ cursor: 'default' }}
              onClick={(e) => e.preventDefault()}
            >
              <img src={RANDOM_AVATAR} alt="avatar" />
              <p>Anônimo</p>
            </Link>
          )}
          {!complaint.anonymous && (
            <Link to={`/profile/${complaint.user.id}`}>
              <img
                src={complaint.user.avatar_url || RANDOM_AVATAR}
                alt="avatar"
              />
              <p>{complaint.user.nickname}</p>
            </Link>
          )}
        </AvatarContainer>
        <IconsContainer>
          <ComplaintStatus status={complaint.status}>
            {complaint.status}
          </ComplaintStatus>
          {!!complaint.user && complaint.user.id === user.id && (
            <>
              <button
                type="button"
                onClick={() => handleDeleteComplaint(complaint.id)}
              >
                <FiTrash />
              </button>

              <Link to={`/edit-report/${complaint.id}`}>
                <FiEdit />
              </Link>
            </>
          )}
          <Link
            to={{
              pathname: `/complaint/${complaint.id}`,
            }}
          >
            <IoMdPin />
          </Link>
        </IconsContainer>
      </Header>
      <Title>
        <h5>{complaint.title}</h5>
        <h6>
          {format(new Date(complaint.date), "'Dia' dd 'de' MMMM 'às' HH:mm", {
            locale: ptBR,
          })}
        </h6>
      </Title>
      <Description>
        <p>{complaint.description}</p>
      </Description>

      <ImageContainer>
        <img
          src={complaint.image_url || RANDOM_COMPLAINT_IMAGE}
          alt="default"
        />
      </ImageContainer>

      <Options>
        {complaint.user_id !== user.id && !complaint.anonymous && (
          <button
            type="button"
            onClick={() => handleCreateChatWithReporter(complaint.user_id)}
          >
            {!loadingCreateChat && 'Entrar em contato'}
            {loadingCreateChat && <Loader />}
          </button>
        )}
        <button type="button" onClick={handleFetchComments}>
          {!loadingFetchComments && 'Comentários'}
          {loadingFetchComments && <Loader />}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/complaint/${complaint.id}`)}
        >
          Ver mais
        </button>
      </Options>
      {comments &&
        comments.length > 0 &&
        comments.map((comment: IComment) => (
          <CommentItem
            key={comment.id}
            onClick={() => navigate(`/profile/${comment.user_id}`)}
            numberOfVisibleLines={2}
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
      <AddComentContainer>
        {loading && <Loader />}
        <AvatarContainer>
          <img src={user.avatar_url || RANDOM_AVATAR} alt="avatar" />
        </AvatarContainer>
        <form onSubmit={(event) => handleCreateComment(event)}>
          <input
            type="text"
            placeholder="Adicionar um comentário"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <ButtonSend type="submit">
            <FiSend color="white" size={20} />
          </ButtonSend>
        </form>
      </AddComentContainer>
    </Container>
  );
};

export default Card;
