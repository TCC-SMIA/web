import React from 'react';
import { IoMdPin } from 'react-icons/io';

import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  AvatarContainer,
  Description,
  Options,
} from './styles';

import IComplaint from '../../entities/Complaint';

interface ICardProps {
  complaint: IComplaint;
}

const Card: React.FC<ICardProps> = ({ complaint }) => {
  return (
    <Container>
      <Header>
        <AvatarContainer>
          <img
            src={
              complaint.user.avatar_url ||
              'https://api.adorable.io/avatars/285/abott@adorable.pngCopy to Clipboard'
            }
            alt="avatar"
          />
          <p>{complaint.user.name}</p>
        </AvatarContainer>
        <Link to="/complaint">
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
        <button type="button">Chamar relator</button>
        <button type="button">Comentar</button>
      </Options>
    </Container>
  );
};

export default Card;
