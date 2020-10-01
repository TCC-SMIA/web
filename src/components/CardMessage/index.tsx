import React, { useState } from 'react';

import perfil from '../../assets/avatar-message.png';
import ChatListItem from './ChatListItem';
import ChatWindow from './ChatWindow';

import { Container, SideBar, ContentArea, Header, ChatList } from './styles';

const CardMessage: React.FC = () => {
  const [chatlist, setChatlist] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [activeChat, setActiveChat] = useState({});

  return (
    <Container>
      <SideBar>
        <Header>
          <img src={perfil} alt="perfil mensagem" />
          <h1>Fulano</h1>
        </Header>

        <ChatList>
          {chatlist.map((item, key) => (
            <ChatListItem />
          ))}
        </ChatList>
      </SideBar>

      <ContentArea>
        <ChatWindow />
        {/* {activeChat.chatId !== undefined &&
          <ChatWindow />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        } */}
      </ContentArea>
    </Container>
  );
};

export default CardMessage;
