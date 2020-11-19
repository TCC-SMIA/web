import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 30px;
`;

export const Title = styled.h1`
  text-align: center;
  border-bottom: 1px solid var(--color-smia);
  font-weight: 500;
`;

export const ComplaintList = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(600px, 600px));
  grid-template-rows: repeat(auto-fit, min(1fr, 1fr));
`;

export const ComplaintItem = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 20px;
  background: #f9f9f9;

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    h1 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
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
