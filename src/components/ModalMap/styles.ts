import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;

  display: flex;
  flex-direction: column;
  height: 60vh;
  width: 50vw;
  border-radius: 5px;

  background-color: var(--color-white);

  @media (max-width: 768px) {
    top: 5%;
    left: 2.5%;
    height: 90vh;
    width: 90vw;
  }
`;

export const MapContainer = styled.div`
  display: flex;

  max-width: 100%;
  height: 100%;

  > div {
    display: flex;
    flex: 1;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px;

  height: 48px;

  h1 {
    font-size: 1.6rem;
    color: var(--color-bg-button);
  }

  button {
    font-size: 1.6rem;
    color: var(--color-bg-button);
    background-color: transparent;
    text-decoration: none;
    border: none;
    align-items: center;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1rem;
    }
  }
`;
