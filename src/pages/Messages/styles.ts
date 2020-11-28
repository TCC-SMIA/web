import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: var(--color-white);
  border-radius: 5px;
  min-width: 80%;
  height: 100vh;

  @media (max-width: 700px) {
    height: 100vh;

    flex-direction: column;
  }
`;

export const ChatsContainer = styled.div`
  width: 30%;
  background: var(--color-white);
  z-index: 9999;

  @media (max-width: 700px) {
    width: 100%;
    position: fixed;
    top: 0;
  }
`;

export const ChatList = styled.div`
  height: 100%;

  overflow-y: scroll;

  @media (max-width: 700px) {
    display: flex;
  }
`;

export const ChatItem = styled.div<{ selected: boolean }>`
  margin: 6px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 12px;
  background: ${(props) =>
    props.selected ? lighten(0.2, '#426d49') : '#f5f5f5'};
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

  @media (max-width: 700px) {
    img {
      display: none;
    }
  }
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 70%;

  @media (max-width: 700px) {
    width: 100%;
    height: 80%;
  }
`;

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: var(--color-textarea);
  height: 95%;
  padding: 12px;

  div + div {
    margin-top: 10px;
    justify-content: flex-end;
  }
`;

export const OwnerMessage = styled.div<{ loading: boolean }>`
  position: relative;
  background: ${lighten(0.3, '#426d49')};
  padding: 12px;
  min-height: ${(props) => (props.loading ? '50px' : '')};
  border-radius: 10px 10px 0px 10px;
  width: 50%;
  align-self: flex-end;
  word-wrap: break-word;

  @media (max-width: 700px) {
    width: 80%;
  }

  span {
    color: #333;
    font-size: 12px;
    align-self: flex-end;
  }
`;

export const AnswerMessage = styled.div`
  display: flex;
  flex-direction: column;
  background: #d5d5d5;
  padding: 12px;
  border-radius: 0px 10px 10px 10px;
  width: 50%;
  word-wrap: break-word;
  align-self: flex-start;

  p {
    align-self: flex-start;
  }

  @media (max-width: 700px) {
    width: 80%;
  }

  span {
    color: #333;
    font-size: 12px;
    align-self: flex-end;
  }
`;

export const MessagesBox = styled.div`
  height: 62px;
  width: 100%;
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
  @media (max-width: 700px) {
    position: fixed;
    bottom: 45px;
  }
`;

export const ButtonSend = styled.button`
  width: 40px;
  height: 40px;
  background: var(--color-smia);
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

export const EmptyChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  h3 {
    color: var(--color-smia);
  }

  img {
    width: 80%;
  }
`;
