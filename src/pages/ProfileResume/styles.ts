import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-right: 30px;

  h1 {
    font-size: 2.4rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;

    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }
  }
`;
