import React from 'react';

import { Container, NotificationItem } from './styles';

interface NotificationProps {
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ visible }) => {
  return (
    <Container isVisible={!visible}>
      <div>
        <h1>Notificações</h1>
      </div>
      <NotificationItem>
        <p>Fulano comentou na sua denúncia.</p>
      </NotificationItem>
      <NotificationItem>
        <p>Sua denúncia foi criada com sucesso.</p>
      </NotificationItem>
      <NotificationItem>
        <p>Sua denúncia foi atualizada com sucesso.</p>
      </NotificationItem>
    </Container>
  );
};

export default Notification;
