import React from 'react';
import { MdMessage } from 'react-icons/md';

import {
  Container,
} from './styles';

const ChatIntro: React.FC = () => {

  return (
    <Container>
      <MdMessage size={200} color="green" />
      <h1>Vazio :(</h1>
      <h2>Você precisa clicar em uma conversa</h2>
    </Container>
  );
};

export default ChatIntro;