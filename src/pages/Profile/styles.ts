import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormContent = styled.div`
  min-width: 500px;
  align-items: center;
  margin-top: 1.2rem;

  form {
    display: flex;
    flex-direction: column;
  }

  button {
    margin: 1.5rem 0;
    align-self: center;
  }

  @media (max-width: 520px) {
    min-width: 70%;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;

  img {
    width: 240px;
    height: 240px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--color-smia);
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      color: var(--color-background);
    }

    &:hover {
      background-color: var(--color-title-green);
    }
  }
`;

export const ButtonLogout = styled.button`
  position: relative;
  width: 80%;
  height: 46px;
  border-radius: 10px;
  border: none;
  background: var(--color-input);
  color: var(--color-white);
  font-weight: bold;
  font-size: 1.2rem;
  transition: 0.2s;
  letter-spacing: 0.1rem;

  &:hover {
    background: ${shade(0.2, `#0A2342`)};
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
