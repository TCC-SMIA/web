import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  h1 {
    text-align: center;
    font-size: 2.4rem;
  }

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    margin-right: 0px;

    h1 {
      margin-top: 5px;
      font-size: 1.4rem;
    }

    img {
      width: 120px;
      height: 120px;
    }
  }
`;
