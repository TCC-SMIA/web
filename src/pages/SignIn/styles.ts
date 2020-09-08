import styled from 'styled-components';

import bgSignIn from '../../assets/bg-signin.jpg';

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
  min-height: 100vh;
  height: 100%;
  flex-direction: column;
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

    img {
      width: 90px;
      height: 90px;
      border-radius: 45px;
    }

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

    a {
      color: var(--color-white);
      display: block;
      text-decoration: none;
      margin-top: 24px;
      transition: color 0.2s;
    }
  }
`;

export const ForgotPasswordContainer = styled.div`
  margin: 8px 0;
  padding: 8px;

  a {
    font-size: 1rem;
    text-decoration: none;
    color: var(--color-bg-button);
  }
`;

export const NotHaveAccountContainer = styled.div`
  > h1 {
    font-weight: normal;
    font-size: 1rem;
    color: var(--color-white);
  }

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
