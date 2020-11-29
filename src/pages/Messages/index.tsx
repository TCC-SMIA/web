import React, { useCallback, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import { format } from 'date-fns';
import Loader from '../../components/Loader';
import IChat from '../../entities/Chat';
import { useAuth } from '../../hooks/useAuth';
import { useChatContext } from '../../hooks/useChat';
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
  const { user } = useAuth();
  const { chatId, saveChatId } = useChatContext();

  const [chats, setChats] = useState([] as IChat[]);
  const [messages, setMessages] = useState([] as IMessage[]);
  const [selected, setSelected] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingMessage, setloadingMessage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get('/chats')
      .then((response) => {
        setChats(response.data);
        setSelected(chatId || response.data[0].id);
        setLoadingPage(false);
      })
      .catch(() => {
        setLoadingPage(false);
      });
  }, [chatId]);

  useEffect(() => {
    socket.subscribeToMessagesChannel((data: IMessage[]) => {
      if (selected === data[0].chat_id) {
        setMessages(data);
      }
    });
  }, [selected]);

  useEffect(() => {
    socket.subscribeToChatsChannel((data: IChat[]) => {
      setChats(data);
    });
  }, []);

  useEffect(() => {
    setloadingMessage(true);
    if (selected)
      api
        .get(`/messages`, { params: { chat_id: selected } })
        .then((response) => {
          setMessages(response.data);
          setloadingMessage(false);
        })
        .catch(() => {
          setloadingMessage(false);
        });
  }, [selected]);

  const handleSelect = useCallback(
    (chat_id: string) => {
      saveChatId(chat_id);
      setSelected(chat_id);
    },
    [saveChatId],
  );

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
      {loadingPage && <Loader />}
      {chats.length === 0 && !loadingPage && (
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
                        <p>{message.content}</p>

                        <span>
                          {format(new Date(message.created_at), 'dd/MM HH:mm')}
                        </span>
                      </OwnerMessage>
                    );
                  }
                  return (
                    <AnswerMessage key={message.id}>
                      <p>{message.content}</p>

                      <span>
                        {format(new Date(message.created_at), 'dd/MM HH:mm')}
                      </span>
                    </AnswerMessage>
                  );
                })}
              {loadingMessage && <Loader />}
              {messages.length === 0 && !loadingMessage && (
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
