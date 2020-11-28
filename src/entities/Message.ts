export default interface IMessage {
  id: string;
  content: string;
  user_id: string;
  chat_id: string;
  created_at: Date;
}
