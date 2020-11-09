import React, { useCallback } from 'react';
import { IoMdPin } from 'react-icons/io';

import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  AvatarContainer,
  Description,
  Options,
} from './styles';
import IComplaint from '../../entities/Complaint';
import { RANDOM_AVATAR } from '../../utils/constants';
import api from '../../services/api';

interface ICreateChatRequestParams {
  contact_id: string;
}
interface ICardProps {
  complaint: IComplaint;
}

const Card: React.FC<ICardProps> = ({ complaint }) => {
  const navigate = useNavigate();

  const handleCreateChatWithReporter = useCallback(
    (user_id) => {
      api.post('/chats', {
        contact_id: user_id,
      } as ICreateChatRequestParams);

      navigate('/messages');
    },
    [navigate],
  );

  return (
    <Container>
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
                src={complaint.user.avatar_url || RANDOM_AVATAR}
                alt="avatar"
              />
              <p>{complaint.user.name}</p>
            </>
          )}
        </AvatarContainer>
        <Link
          to={{
            pathname: `/complaint/${complaint.id}`,
          }}
        >
          <IoMdPin />
        </Link>
      </Header>
      <Description>
        <p>{complaint.description}</p>
      </Description>
      <img
        src={
          complaint.image_url ||
          'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
        }
        alt="default"
      />

      <Options>
        <button
          type="button"
          onClick={() => handleCreateChatWithReporter(complaint.user.id)}
        >
          Chamar relator
        </button>
        <button type="button">Comentar</button>
      </Options>
    </Container>
  );
};

export default Card;
