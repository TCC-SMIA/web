import React, { useCallback, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import IChat from '../../entities/Chat';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { RANDOM_AVATAR } from '../../utils/constants';

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

interface ICreateMessageRequestParams {
  chat_id: string;
  content: string;
}

const Messages: React.FC = () => {
  const [chats, setChats] = useState([] as IChat[]);
  const [selected, setSelected] = useState({} as IChat);
  const [inputMessage, setInputMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    api.get('/chats').then((response) => {
      setChats(response.data);
      setSelected(response?.data[0]);
    });
  }, []);

  const handleSelect = useCallback((chat: IChat) => {
    setSelected(chat);
  }, []);

  const handleCreateMessage = useCallback(() => {
    api.post('/messages', {
      chat_id: selected?.id,
      content: inputMessage,
    } as ICreateMessageRequestParams);
  }, [selected, inputMessage]);

  return (
    <Container>
      <ChatsContainer>
        <ChatList>
          {chats.length > 0 &&
            chats.map((chat: IChat) => {
              return chat.user_id !== user.id ? (
                <ChatItem
                  key={chat.id}
                  onClick={() => handleSelect(chat)}
                  selected={chat.id === selected.id}
                >
                  <img
                    src={chat?.user?.avatar_url || RANDOM_AVATAR}
                    alt="avatar"
                  />
                  <p>{chat?.user?.nickname || chat?.user?.name}</p>
                </ChatItem>
              ) : (
                <ChatItem
                  key={chat.id}
                  onClick={() => handleSelect(chat)}
                  selected={chat.id === selected.id}
                >
                  <img
                    src={chat?.destinatary?.avatar_url || RANDOM_AVATAR}
                    alt="avatar"
                  />
                  <p>
                    {chat?.destinatary?.nickname || chat?.destinatary?.name}
                  </p>
                </ChatItem>
              );
            })}
        </ChatList>
      </ChatsContainer>
      <MessagesContainer>
        <MessagesList>
          {selected?.messages &&
            selected.messages.map((message) => {
              if (message.user_id === user.id) {
                return (
                  <OwnerMessage key={message.id}>
                    {message.content}
                  </OwnerMessage>
                );
              }
              return (
                <AnswerMessage key={message.id}>
                  {message.content}
                </AnswerMessage>
              );
            })}
        </MessagesList>
        <MessagesBox>
          <form onSubmit={() => handleCreateMessage()}>
            <input
              type="text"
              placeholder="Digite uma mensagem"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <ButtonSend type="submit">
              <FiSend color="white" size={20} />
            </ButtonSend>
          </form>
        </MessagesBox>
      </MessagesContainer>
    </Container>
  );
};

export default Messages;
