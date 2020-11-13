import io from 'socket.io-client';

const socket = io('wss://smia-api.herokuapp.com/', { autoConnect: false });

const connect = (user_id: string): void => {
  socket.io.opts.query = {
    user_id,
  };

  socket.connect();
};

const disconnect = (): void => {
  if (socket.connected) socket.disconnect();
};

const subscribeToNewNotifications = (subscribeFunction: any): void => {
  socket.on('new-notification', subscribeFunction);
};

export { connect, disconnect, subscribeToNewNotifications };
