import React, { useCallback, useEffect, useState } from 'react';
import { WiMoonNew, WiMoonAltNew } from 'react-icons/wi';

import api from '../../services/api';
import * as socket from '../../services/socket';
import INotification from '../../entities/Notification';
import { Container, NotificationItem, ReadButton } from './styles';
import { useAuth } from '../../hooks/useAuth';

interface NotificationProps {
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ visible }) => {
  const [notifications, setNotifications] = useState([] as INotification[]);
  const { user } = useAuth();

  useEffect(() => {
    socket.connect(user.id);

    socket.subscribeToNewNotifications((data: INotification[]) => {
      setNotifications(data);
    });
  }, [user.id]);

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
      {notifications &&
        notifications.map((notification: INotification) => (
          <NotificationItem
            key={notification.id}
            onClick={() => handleReadNotification(notification)}
          >
            <p>{notification.content}</p>
            <ReadButton>
              {notification.read ? (
                <WiMoonNew color="#426d49" />
              ) : (
                <WiMoonAltNew color="#426d49" />
              )}
            </ReadButton>
          </NotificationItem>
        ))}
    </Container>
  );
};

export default Notification;
