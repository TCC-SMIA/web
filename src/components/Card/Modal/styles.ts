import styled from 'styled-components';

export const Container = styled.div`
  transition: 0.2s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  section {
    position: fixed;
    background: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;

    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
      display: flex;
      justify-content: center;

      button {
        position: relative;
        height: 80px;
        width: 240px;
        border-radius: 20px;
        font-size: 1.8rem;
        background: var(--color-bg-button);
        color: #fff;
        border: none;
        font-weight: bold;

        & + button {
          margin-left: 20px;
          background: var(--color-smia);
        }

        @media (max-width: 768px) {
          height: 40px;
          width: 120px;
          font-size: 1rem;
        }
      }
    }
  }
`;
