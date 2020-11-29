import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 30px;
`;

export const Title = styled.h1`
  text-align: center;
  border-bottom: 1px solid var(--color-smia);
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const ComplaintList = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(600px, 600px));
  grid-template-rows: repeat(auto-fit, min(1fr, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
    grid-template-rows: repeat(auto-fit, min(1fr, 1fr));
  }
`;

export const ComplaintItem = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 20px;
  background: #f9f9f9;
  align-items: center;
  cursor: pointer;

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    h1 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;

      @media (max-width: 768px) {
        display: none;
      }
    }

    span {
      font-size: 0.6rem;
    }
  }

  img {
    height: 80px;
    width: 120px;
    border-radius: 20%;
  }
`;
