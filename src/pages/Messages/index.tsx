import React, { useCallback, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import Loader from '../../components/Loader';

import IChat from '../../entities/Chat';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import EmptyMessageSVG from '../../assets/empty-list-messages.svg';
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
  EmptyContainer,
} from './styles';

interface ICreateMessageRequestParams {
  chat_id: string;
  content: string;
}

const Messages: React.FC = () => {
  const [chats, setChats] = useState([] as IChat[]);
  const [selected, setSelected] = useState({} as IChat);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleCreateMessage = useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);

      if (inputMessage === '') {
        setLoading(false);
        return;
      }

      api
        .post('/messages', {
          chat_id: selected?.id,
          content: inputMessage,
        } as ICreateMessageRequestParams)
        .then((response) => {
          const newChats = chats;

          const chatIndex = chats.findIndex((chat) => {
            return chat.id === response.data.chat.id;
          });

          newChats[chatIndex].messages.push(response.data);

          setChats(newChats);
          setInputMessage('');
          setLoading(false);
        });
    },
    [selected, inputMessage, chats],
  );

  return (
    <Container>
      {chats.length === 0 && (
        <EmptyContainer>
          <h2>Não encontramos chats criados.</h2>
          <img src={EmptyMessageSVG} alt="Lista de mensagens vazia" />
        </EmptyContainer>
      )}
      {chats.length > 0 && (
        <>
          <ChatsContainer>
            <ChatList>
              {chats.length > 0 &&
                chats.map((chat: IChat) => {
                  return (
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
                        {chat?.destinatary?.name || chat?.destinatary?.nickname}
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
              {loading && (
                <OwnerMessage key="message-loading">
                  <Loader />
                </OwnerMessage>
              )}
            </MessagesList>
            <MessagesBox>
              {selected.id && (
                <form onSubmit={(event) => handleCreateMessage(event)}>
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
              )}
            </MessagesBox>
          </MessagesContainer>
        </>
      )}
    </Container>
  );
};

export default Messages;
