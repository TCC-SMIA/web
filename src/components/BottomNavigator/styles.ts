import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  background-color: var(--color-smia);
  background: red;
  height: var(--bottom-navigator-height);
  position: fixed;
  bottom: 0;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-template-rows: 1fr;

  @media (min-width: 768px) {
    display: none;
  }

  a {
    padding: 5px 0 2px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--color-smia);

    :hover {
      background: var(--color-smia);
    }

    svg {
      color: #fff;
      height: 20px;
      width: 20px;
    }

    p {
      margin-top: 5px;
      font-size: 0.8rem;
      color: #fff;
    }
  }
`;
