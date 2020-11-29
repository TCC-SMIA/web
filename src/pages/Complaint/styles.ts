import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MapContainer = styled.div`
  display: flex;
  width: 70%;
  max-width: 70%;
  height: 100%;

  > div {
    display: flex;
    flex: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 70%;
  }
`;

export const ComplaintContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 30%;

  overflow-x: scroll;

  img {
    width: 90%;
    align-self: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 70%;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;

  img {
    width: 50%;
    margin: 12px;
  }

  h1 {
    margin-top: 24px;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  p {
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 10px;
  }
`;

export const Description = styled.div`
  margin-top: 0.8rem;

  p {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

export const Title = styled.div`
  margin-top: 0.8rem;

  p {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const CommentsContainer = styled.div`
  h1 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: normal;
  }
`;

export const LoadingItem = styled.div`
  position: relative;
  min-height: 50px;
`;

export const CommentItem = styled.div<{ numberOfVisibleLines?: number }>`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;

  & + div {
    margin-top: 10px;
  }

  span {
    color: #777;
    font-size: 10px;
    align-self: flex-end;
  }

  div {
    p {
      color: #555;
      font-size: 14px;

      ${(props) =>
        props.numberOfVisibleLines &&
        css`
          font-size: 0.8rem;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        `}
    }
  }
`;

export const CommentAvatarContainer = styled.div`
  display: flex;
  align-items: center;

  h5 {
    font-size: 14px;
    font-weight: 500;
  }

  img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    color: var(--color-smia);
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

export const CreateComment = styled.div`
  position: relative;
  display: flex;
  margin: 8px 0;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    input {
      height: 100%;
      border-radius: 5px;
      border: none;
      padding: 2px;
    }
  }
`;
