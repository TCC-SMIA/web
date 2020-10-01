import React, { useState } from 'react';
import { FiMoreVertical, FiSend } from 'react-icons/fi';

import perfil from '../../../assets/avatar-message.png';

import MessageItem from '../MessageItem';

import {
  Container,
  Header,
  Body,
  Footer,
  HeaderInfo,
  HeaderButtons,
  HeaderBtn,
  ButtonSend,
} from './styles';

const ChatWindow: React.FC = () => {
  const [List, setList] = useState([
    { body: 'bla bla bla' },
    { body: 'bla bla' },
    { body: 'bla bla bla bla' },
  ]);

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <img src={perfil} alt="avatar" />
          <h1>Órgão Responsável</h1>
        </HeaderInfo>
        <HeaderButtons>
          <HeaderBtn>
            <FiMoreVertical color="#919191" />
          </HeaderBtn>
        </HeaderButtons>
      </Header>

      <Body>
        {List.map((item, key) => (
          <MessageItem />
        ))}
      </Body>

      <Footer>
        <input type="text" placeholder="Digite uma mensagem" />

        <ButtonSend>
          <FiSend color="white" size={20} />
        </ButtonSend>
      </Footer>
    </Container>
  );
};

export default ChatWindow;
