import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
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
  grid-row-gap: 5px;
`;

export const ChatItem = styled.div<{ selected: boolean }>`
  display: flex;
  background: ${(props) =>
    props.selected ? lighten(0.2, '#426d49') : '#f5f5f5'};
  padding: 10px;
  border-radius: 15px;
  transition: 0.2s;

  :hover {
    cursor: ${(props) => (props.selected ? 'normal' : 'pointer')};
  }

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
  position: relative;
  background: ${lighten(0.3, '#426d49')};
  padding: 10px;
  border-radius: 10px 10px 0px 10px;
  width: 50%;
  min-height: 50px;
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

  form {
    display: flex;
    align-items: center;
    width: 100%;
  }

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

export const ButtonSend = styled.button`
  width: 40px;
  height: 40px;
  background: #426d49;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0px 15px 15px 0px;
  border: none;
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;

  h2 {
    color: var(--color-smia);
    margin: 8px;
  }

  img {
    width: 100%;
  }
`;
