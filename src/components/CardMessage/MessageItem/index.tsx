import React from 'react';

import { Container, Message, MessageText, MessageDate } from './styles';

const MessageItem: React.FC = () => {
  return (
    <Container>
      <Message style={{ justifyContent: 'flex-end' }}>
        <MessageText>Blá blá blá Blá blá blá Blá blá blá</MessageText>
        <MessageDate>19:05</MessageDate>
      </Message>
    </Container>
  );
};

export default MessageItem;
