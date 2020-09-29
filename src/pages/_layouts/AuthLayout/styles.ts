import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--header-height);
  min-height: 100vh;
  height: 100%;
  background: var(--color-background);
  padding-top: 110px;

  @media (max-width: 768px) {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;
    padding-bottom: 5px;
  }
`;
