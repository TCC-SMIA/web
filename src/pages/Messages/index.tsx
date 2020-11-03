import React, { useCallback, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import IChat from '../../entities/Chat';
import api from '../../services/api';

import {
  Container,
  ChatsContainer,
  ChatList,
  ChatItem,
  MessagesContainer,
  MessagesList,
  OwnerMessage,
  AnswerMessage,
  MessagesBox,
  ButtonSend,
} from './styles';

const Messages: React.FC = () => {
  const [chats, setChats] = useState([] as IChat[]);
  const [selected, setSelected] = useState({} as IChat);

  useEffect(() => {
    api.get('/chats').then((response) => {
      setChats(response.data);
      setSelected(response?.data[0]);
    });
  }, []);

  const handleSelect = useCallback((chat: IChat) => {
    setSelected(chat);
  }, []);

  return (
    <Container>
      <ChatsContainer>
        <ChatList>
          {chats.length > 0 &&
            chats.map((chat: IChat) => (
              <ChatItem key={chat.id} onClick={() => handleSelect(chat)}>
                <img
                  src={
                    chat?.destinatary?.avatar_url ||
                    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                  }
                  alt="avatar"
                />
                <p>{chat?.destinatary?.nickname || chat?.destinatary?.name}</p>
              </ChatItem>
            ))}
        </ChatList>
      </ChatsContainer>
      <MessagesContainer>
        <MessagesList>
          {selected?.messages &&
            selected.messages.map((message) => {
              if (message.user_id === selected.user_id) {
                return <OwnerMessage>{message}</OwnerMessage>;
              }
              return <AnswerMessage>{message}</AnswerMessage>;
            })}
        </MessagesList>
        <MessagesBox>
          <input type="text" placeholder="Digite uma mensagem" />
          <ButtonSend>
            <FiSend color="white" size={20} />
          </ButtonSend>
        </MessagesBox>
      </MessagesContainer>
    </Container>
  );
};

export default Messages;
