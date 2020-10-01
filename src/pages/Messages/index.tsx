import React from 'react';
import { FiSend } from 'react-icons/fi';

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
  return (
    <Container>
      <ChatsContainer>
        <ChatList>
          <ChatItem>
            <img
              src="https://api.adorable.io/avatars/285/abott@adorable.png"
              alt="avatar"
            />
            <p>Nome do candango</p>
          </ChatItem>
        </ChatList>
      </ChatsContainer>
      <MessagesContainer>
        <MessagesList>
          <OwnerMessage>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ab,
            ullam excepturi non magni, quidem cupiditate rerum ipsa blanditiis
            vero aliquam adipisci aperiam imp
          </OwnerMessage>
          <AnswerMessage>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem rem
            reiciendis exercitationem non quaerat
          </AnswerMessage>
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
