import io from 'socket.io-client';
import SocketChannels from './socket-channels';

const socket = io('ws://localhost:3333', { autoConnect: false });
// const socket = io('wss://smia-api.herokuapp.com/', { autoConnect: false });

type SubscribeFunction = (data: any) => any;

const connect = (user_id: string): void => {
  socket.io.opts.query = {
    user_id,
  };

  socket.connect();
};

const disconnect = (): void => {
  if (socket.connected) socket.disconnect();
};

const subscribeToNewNotifications = (
  subscribeFunction: SubscribeFunction,
): void => {
  socket.on(SocketChannels.NotificationsChannel, subscribeFunction);
};

const subscribeToComplaintsFeed = (
  subscribeFunction: SubscribeFunction,
): void => {
  socket.on(SocketChannels.ComplaintsFeedChannel, subscribeFunction);
};

const subscribeToChatsChannel = (
  subscribeFunction: SubscribeFunction,
): void => {
  socket.on(SocketChannels.ChatChannel, subscribeFunction);
};

const subscribeToMessagesChannel = (
  subscribeFunction: SubscribeFunction,
): void => {
  socket.on(SocketChannels.MessagesChannel, subscribeFunction);
};

export default {
  connect,
  disconnect,
  subscribeToNewNotifications,
  subscribeToComplaintsFeed,
  subscribeToChatsChannel,
  subscribeToMessagesChannel,
};
