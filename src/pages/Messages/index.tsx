import React, { useCallback, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import Loader from '../../components/Loader';
import IChat from '../../entities/Chat';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import EmptyMessageSVG from '../../assets/empty-list-messages.svg';
import EmptyMessageChatSVG from '../../assets/empty-message-chat.svg';

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
  EmptyChat,
} from './styles';
import socket from '../../services/socket/socket';
import IMessage from '../../entities/Message';

interface ICreateMessageRequestParams {
  chat_id: string;
  content: string;
}

const Messages: React.FC = () => {
  const [chats, setChats] = useState([] as IChat[]);
  const [messages, setMessages] = useState([] as IMessage[]);
  const [selected, setSelected] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    api.get('/chats').then((response) => {
      setChats(response.data);
      setSelected(response.data[0].id);
    });
  }, []);

  useEffect(() => {
    socket.disconnect();
    socket.connect(user.id);

    socket.subscribeToChatsChannel((data: IChat[]) => {
      setChats(data);
    });

    socket.subscribeToMessagesChannel((data: IMessage[]) => {
      if (selected === data[0].chat_id) {
        setMessages(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (selected)
      api
        .get(`/messages`, { params: { chat_id: selected } })
        .then((response) => {
          setMessages(response.data);
        });
  }, [selected]);

  const handleSelect = useCallback((chat_id: string) => {
    setSelected(chat_id);
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
          chat_id: selected,
          content: inputMessage,
        } as ICreateMessageRequestParams)
        .then((response) => {
          const newMessages = messages;

          newMessages.push(response.data);

          setMessages(newMessages);
          setInputMessage('');
          setLoading(false);
        });
    },
    [selected, inputMessage, messages],
  );

  return (
    <Container>
      {chats.length === 0 && (
        <EmptyContainer>
          <h2>Não encontramos chats criados.</h2>
          <img src={EmptyMessageSVG} alt="Lista de chats vazio." />
        </EmptyContainer>
      )}
      {chats.length > 0 && (
        <>
          <ChatsContainer>
            <ChatList>
              {chats.length > 0 &&
                chats.map((chat: IChat) => {
                  return (chat?.user && chat.user.id) === user.id ? (
                    <ChatItem
                      key={chat.id}
                      onClick={() => handleSelect(chat.id)}
                      selected={chat.id === selected}
                    >
                      <img
                        src={chat?.destinatary?.avatar_url || RANDOM_AVATAR}
                        alt="avatar"
                      />
                      <p>
                        {chat?.destinatary?.name || chat?.destinatary?.nickname}
                      </p>
                    </ChatItem>
                  ) : (
                    <ChatItem
                      key={chat.id}
                      onClick={() => handleSelect(chat.id)}
                      selected={chat.id === selected}
                    >
                      <img
                        src={chat?.user?.avatar_url || RANDOM_AVATAR}
                        alt="avatar"
                      />
                      <p>{chat?.user?.name || chat?.user?.nickname}</p>
                    </ChatItem>
                  );
                })}
            </ChatList>
          </ChatsContainer>
          <MessagesContainer>
            <MessagesList>
              {!!messages &&
                messages.map((message) => {
                  if (message.user_id === user.id) {
                    return (
                      <OwnerMessage loading={loading} key={message.id}>
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
              {messages.length === 0 && (
                <EmptyChat>
                  <h3>Nenhuma mensagem encontrada</h3>
                  <img
                    src={EmptyMessageChatSVG}
                    alt="Lista de mensagens vazia."
                  />
                </EmptyChat>
              )}
              {loading && (
                <OwnerMessage loading={loading} key="message-loading">
                  <Loader />
                </OwnerMessage>
              )}
            </MessagesList>
            <MessagesBox>
              {selected && (
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
