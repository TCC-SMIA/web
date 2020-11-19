import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-right: 30px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
`;

export const ResumeContainer = styled.div`
  display: flex;
`;

export const ResumeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  }

  h2 {
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;
