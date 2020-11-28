import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 25%;
  left: 25%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 50vw;
  border-radius: 5px;
  border: 1px solid var(--color-bg-button);

  background-color: var(--color-white);
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    top: 5%;
    left: 2.5%;
    height: 80vh;
    width: 90vw;
  }
`;
