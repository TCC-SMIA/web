import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const Feed = styled.div`
  margin: 12px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 20px 180px;

  h2 {
    color: var(--color-smia);
    margin: 12px;
  }

  img {
    width: 100%;
  }

  a {
    margin: 16px;
    font-size: 1.8rem;
    color: var(--color-bg-button);
    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, `#f2f2f2`)};
    }
  }

  @media (max-width: 760px) {
    padding: 20px;
  }
`;
