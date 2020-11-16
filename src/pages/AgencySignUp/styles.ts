import styled from 'styled-components';

import bgAgencySignUp from '../../assets/bg-agency-signup.jpg';

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
  background: url(${bgAgencySignUp}) no-repeat center;
  background-size: cover;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
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
    margin-bottom: 16px;

    > p {
      margin-top: 6px;
      font-weight: bold;
      font-size: 2.6rem;
      color: var(--color-white);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 450px) {
    div {
      width: 300px;
      input {
        width: 280px;
      }
    }
  }
`;

export const BottomButtonsContainer = styled.div`
  margin: 8px 0;
  padding: 8px;

  a {
    font-size: 1rem;
    text-decoration: none;
    color: var(--color-bg-button);
    transition: color linear 0.2s;

    display: flex;
    align-items: center;

    & + a {
      margin-top: 8px;
    }

    svg {
      margin-right: 16px;
    }

    :hover {
      color: var(--color-bg-button-hover);
    }
  }
`;

export const LogoImage = styled.img`
  width: 180px;
  height: 180px;

  @media (max-width: 450px) {
    width: 120px;
    height: 120px;
  }
`;
