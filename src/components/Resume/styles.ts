import styled from 'styled-components';

export const ResumeContainer = styled.div`
  display: flex;
`;

export const ResumeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 4px solid var(--color-smia);
    font-weight: bold;
    color: var(--color-smia);

    @media (max-width: 768px) {
      font-size: 1.4rem;
      height: 48px;
      width: 48px;
    }
  }

  h2 {
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;
