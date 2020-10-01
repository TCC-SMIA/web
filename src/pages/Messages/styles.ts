import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 1fr;
  grid-template-areas: 'CHAT' 'MESSAGES';
  min-height: 100%;
  min-width: 90%;
  background: #fff;
  border-radius: 10px;
`;

export const ChatsContainer = styled.div`
  grid-area: 'CHAT';
  padding: 10px;
`;

export const ChatList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

export const ChatItem = styled.div`
  display: flex;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 15px;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  p {
    margin-left: 15px;
  }
`;

export const MessagesContainer = styled.div`
  grid-area: 'MESSAGES';
  border-radius: 10px;
  padding: 20px;
  background: var(--color-title-header);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column;

  div + div {
    margin-top: 10px;
    justify-content: flex-end;
  }
`;

export const OwnerMessage = styled.div`
  background: ${lighten(0.3, '#426d49')};
  padding: 10px;
  border-radius: 10px 10px 0px 10px;
  width: 50%;
  align-self: flex-end;
`;

export const AnswerMessage = styled.div`
  background: #d5d5d5;
  padding: 10px;
  border-radius: 0px 10px 10px 10px;
  width: 50%;
  align-self: flex-start;
`;

export const MessagesBox = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
  padding: 15px;

  input {
    width: 100%;
    height: 40px;
    border: 0;
    outline: 0;
    background: #fff;
    border-radius: 15px 0px 0px 15px;
    font-size: 15px;
    color: #4a4a4a;
    padding-left: 15px;
  }
`;

export const ButtonSend = styled.div`
  width: 40px;
  height: 40px;
  background: #426d49;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0px 15px 15px 0px;
`;
