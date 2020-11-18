import styled from 'styled-components';

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

export const CommentItem = styled.div`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 5px;
  justify-content: space-between;

  & + div {
    margin-top: 10px;
  }

  span {
    color: #777;
    font-size: 10px;
    align-self: flex-end;
  }

  > div {
    display: flex;
    align-items: center;

    > div {
      h5 {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    margin-right: 5px;
  }

  p {
    color: #555;
    font-size: 14px;
  }
`;
