import React, { useCallback, useEffect, useState } from 'react';
import { WiMoonNew, WiMoonAltNew } from 'react-icons/wi';

import api from '../../services/api';
import INotification from '../../entities/Notification';
import { Container, NotificationItem, ReadButton } from './styles';

interface NotificationProps {
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ visible }) => {
  const [notifications, setNotifications] = useState([] as INotification[]);

  useEffect(() => {
    api.get('/notifications').then((response) => {
      setNotifications(response.data);
    });
  }, []);

  const handleReadNotification = useCallback((notification: INotification) => {
    api.patch('/notifications/read', { notification_id: notification.id });
  }, []);

  return (
    <Container isVisible={visible}>
      <div>
        <h1>Notificações</h1>
      </div>
      {notifications &&
        notifications.map((notification: INotification) => (
          <NotificationItem key={notification.id}>
            <p>{notification.content}</p>

            <ReadButton onClick={() => handleReadNotification(notification)}>
              {notification.read ? <WiMoonNew /> : <WiMoonAltNew />}
            </ReadButton>
          </NotificationItem>
        ))}
    </Container>
  );
};

export default Notification;
