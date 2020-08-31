import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: scroll;
  display: flex;
  min-height: 100vh;
  height: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #9aa0a6;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  min-height: 100vh;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  background: #e8eaf0;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    img {
      width: 90px;
      height: 90px;
      border-radius: 45px;
    }

    > p {
      margin-top: 8px;
      font-weight: bold;
      font-size: 2.2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      border-radius: 5px;
      padding: 20px;
      transition: 0.2s;
      background: #fff;

      & + div {
        margin-top: 2px;
      }

      svg {
        margin-right: 10px;
        transition: 0.2s;
        color: #9aa0a6;
      }

      input {
        border: 0;
        font-size: 1.2rem;
        width: 350px;
        color: #777;

        ::placeholder {
          color: #9aa0a6;
        }
      }
    }

    button {
      margin-top: 10px;
      width: 250px;
      height: 44px;
      border-radius: 10px;
      border: none;
      background: #9d9b9b;
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;
      transition: 0.2s;
      letter-spacing: 0.1rem;
    }
  }
`;

export const NotHaveAccountContainer = styled.div`
  > h1 {
    font-weight: normal;
    font-size: 0.9rem;
  }

  a {
    font-size: 0.8rem;
  }
`;
