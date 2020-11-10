import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: var(--header-height);
  background: var(--color-smia);
  display: flex;

  padding: 0 30px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoImage = styled.img`
  width: 96px;
  height: 96px;
  margin-left: 20px;
`;

export const Botoes = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  position: relative;

  svg {
    color: #fff;
    height: 28px;
    width: 28px;
  }

  a {
    :hover {
      svg {
        color: var(--color-hover-tooltip);
      }

      p {
        color: var(--color-hover-tooltip);
      }
    }
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  margin: 30px;
  background: none;
  border: none;

  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 12px;
  }
`;

export const Title = styled.p`
  color: var(--color-title-header);
  font-size: 12px;

  font-weight: bold;
`;

export const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    > strong {
      color: var(--color-title-green);
    }
  }

  div {
    margin-left: 10px;

    strong {
      font-size: 16px;
      display: block;
      color: ${(props) => props.theme.colors.headerText};
    }

    > p {
      display: block;
      font-size: 10px;
      margin-top: 2px;
      color: var(--color-white);
    }
  }
`;
