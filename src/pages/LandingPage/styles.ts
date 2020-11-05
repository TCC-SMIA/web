import styled from 'styled-components';
import { shade } from 'polished';

// import bgLandingPage from '../../assets/landing-page-bg.jpeg';

export const Container = styled.div`
  overflow-x: scroll;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
  padding: 60px;

  color: var(--color-background);

  background: ${shade(0.2, `#426d49`)};

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1180px) {
    padding: 80px 90px 0 90px;
  }
`;

export const LogoImage = styled.img`
  width: 300px;
  height: 300px;

  @media (max-width: 450px) {
    width: 80%;
  }
`;

export const Header = styled.header`
  width: 100%;
  padding: 0 16px;

  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  background-color: var(--color-background);

  img {
    height: 80%;
  }

  a {
    max-width: 150px;
    min-width: 20px;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75%;
    text-decoration: none;
    color: var(--color-background);
    border: solid 1px var(--color-smia);
    background-color: var(--color-smia);
    border-radius: 10px;
    transition: 0.2s;
  }

  a:hover {
    color: var(--color-smia);
    background-color: var(--color-background);
  }

  @media (min-width: 1180px) {
    height: 80px;
    padding: 0 60px;

    img {
      height: 100%;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    width: 90%;
  }

  a {
    margin: 20px;
    width: 250px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--color-smia);
    border: solid 1px var(--color-smia);
    background-color: var(--color-background);
    border-radius: 10px;
    transition: 0.2s;
  }

  a:hover {
    color: var(--color-background);
    background-color: var(--color-smia);
    border: solid 1px var(--color-background);
  }

  @media (min-width: 1180px) {
    img {
      width: 70%;
    }
  }
`;

export const InfoContainer = styled.div`
  color: var(--color-background);

  h1 {
    font-size: 4rem;
  }

  p {
    margin-top: 10px;
  }
`;

export const InitialContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 16px;
  align-items: center;
  justify-content: space-around;
  text-align: center;

  @media (min-width: 1180px) {
    flex-direction: row;
    text-align: left;
  }
`;
