import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  background: var(--color-background);
  margin-top: 0;

  @media (max-width: 768px) {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;
    padding-bottom: 5px;
  }
`;
