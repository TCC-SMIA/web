import styled from 'styled-components';

import bgSignIn from '../../assets/bg-forgotpassword.jpg';

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
  background: url(${bgSignIn}) no-repeat center;
  background-size: cover;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  background: var(--color-smia);

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    > p {
      margin-top: 8px;
      font-weight: bold;
      font-size: 2.2rem;
      color: var(--color-white);
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
      background: var(--color-white);

      input {
        border: 0;
        font-size: 1.2rem;
        width: 350px;
        color: var(--color-input);

        ::placeholder {
          color: var(--color-placeholder);
        }
      }
    }

    button {
      margin-top: 10px;
      width: 80%;
      height: 46px;
      border-radius: 10px;
      border: none;
      background: var(--color-bg-button);
      color: var(--color-white);
      font-weight: bold;
      font-size: 1.2rem;
      transition: 0.2s;
      letter-spacing: 0.1rem;
    }
  }
`;

export const BackToLogonContainer = styled.div`
  margin: 16px 0;
  padding: 16px;

  a {
    font-size: 1rem;
    text-decoration: none;
    color: var(--color-bg-button);

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
  }
`;

export const LogoImage = styled.img`
  width: 300px;
  height: 300px;

  margin-top: -160px;
`;
