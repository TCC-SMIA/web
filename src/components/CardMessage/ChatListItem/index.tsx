import React from 'react';
import perfil from '../../../assets/avatar-message.png';

import {
  Container,
  ChatLines,
  ChatLine,
  ChatListName,
  ChatListDate,
  ChatListLastMessage,
} from './styles'



const ChatListItem: React.FC = ({}) => {

  return (
    <Container>
      <img src={perfil} alt='avatar' />
      <ChatLines>
        <ChatLine>
          <ChatListName>Órgão Responsável</ChatListName>
          <ChatListDate>18:30</ChatListDate>
        </ChatLine>

        <ChatLine>
          <ChatListLastMessage>
            <p>Olá, tudo bem? poderia me passar uma informação?</p>
          </ChatListLastMessage>
        </ChatLine>
      </ChatLines>
    </Container>
  );
};

export default ChatListItem;