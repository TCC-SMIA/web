/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react';
import { IoMdPin } from 'react-icons/io';
import {
  FiSend,
  FiTrash,
  FiEdit,
  FiCheckCircle,
  FiBriefcase,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import {
  Container,
  Header,
  AvatarContainer,
  Title,
  Description,
  Options,
  AddComentContainer,
  IconsContainer,
} from './styles';
import IComplaint from '../../entities/Complaint';
import { RANDOM_AVATAR, RANDOM_COMPLAINT_IMAGE } from '../../utils/constants';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { ButtonSend } from '../../pages/Messages/styles';
import Modal from './Modal';

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
  const navigate = useNavigate();
  const { user } = useAuth();

  const getStatusComplaint = (status: string): React.ReactNode => {
    switch (status) {
      case (status = 'New'):
        return <>Nova denúncia</>;
      case (status = 'InProgress'):
        return <>Em progresso</>;
      case (status = 'Resolved'):
        return <>Resolvido</>;
      default:
        return <>Nova denúncia</>;
    }
  };

  const handleCreateChatWithReporter = useCallback(
    (user_id) => {
      api
        .post('/chats', {
          contact_id: user_id,
        } as ICreateChatRequestParams)
        .then(() => {
          navigate('/messages');
        });
    },
    [navigate],
  );

  const handleCreateComment = useCallback(
    (event) => {
      event.preventDefault();

      if (!inputMessage) return;

      api
        .post('/comments', {
          complaint_id: complaint.id,
          content: inputMessage,
        } as ICreateCommentRequestParams)
        .then(() => {
          setInputMessage('');
        });
    },
    [complaint.id, inputMessage],
  );

  const handleDeleteComplaint = useCallback((complaint_id: string) => {
    setComplaintToBeDeleted(complaint_id);
  }, []);

  return (
    <Container>
      <Modal show={complaintToBeDeleted} close={handleDeleteComplaint} />
      <Header>
        <AvatarContainer>
          {complaint.anonymous && (
            <Link to={`/profile/${complaint.user.id}`}>
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
              <p>{complaint.user.name}</p>
            </Link>
          )}
        </AvatarContainer>
        <IconsContainer>
          <span>{getStatusComplaint(complaint.status)}</span>
          {complaint.user.id === user.id && (
            <>
              <button
                type="button"
                onClick={() => handleDeleteComplaint(complaint.id)}
              >
                <FiTrash />
              </button>

              <Link to="/">
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
      </Title>
      <Description>
        <p>{complaint.description}</p>
      </Description>
      <img src={complaint.image_url || RANDOM_COMPLAINT_IMAGE} alt="default" />
      <Options>
        {complaint.user_id !== user.id && !complaint.anonymous && (
          <button
            type="button"
            onClick={() => handleCreateChatWithReporter(complaint.user_id)}
          >
            Chamar relator
          </button>
        )}

        <button
          type="button"
          onClick={() => navigate(`/complaint/${complaint.id}`)}
        >
          Comentários
        </button>
      </Options>
      <AddComentContainer>
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
