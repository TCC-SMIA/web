import React from 'react';

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
      </Header>
      <Description>
        <p>alguma coisa</p>
      </Description>
      <img src={complaint.image_url} alt="default" />

      <Options>
        <button type="button">Chamar relator</button>
        <button type="button">Comentar</button>
      </Options>
    </Container>
  );
};

export default Card;
