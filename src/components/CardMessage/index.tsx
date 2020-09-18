import React, { useState, useEffect } from 'react';
import perfil from '../../assets/avatar-message.png';
import ChatListItem from '../CardMessage/ChatListItem';
import ChatIntro from '../../components/CardMessage/ChatIntro';
import ChatWindow from '../../components/CardMessage/ChatWindow';

import {
  Container,
  SideBar,
  ContentArea,
  Header,
  ChatList,
} from './styles'



const CardMessage: React.FC = () => {

  const [chatlist, setChatlist] = useState([{},{},{},{},{},{},{},{},{},{},{},{},{},{},]);
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
            <ChatListItem
              
            />
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