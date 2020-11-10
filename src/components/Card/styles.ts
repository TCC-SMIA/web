import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px 30px;
  background: #fff;
  border-radius: 30px;

  img {
    width: 100%;
    border-radius: 10px;
    margin: 10px 0;
  }

  & + div {
    margin-top: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
  }

  svg {
    color: var(--color-smia);
    width: 32px;
    height: 32px;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  p {
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 10px;
  }
`;

export const Description = styled.div`
  margin-top: 0.8rem;

  p {
    font-weight: 300;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  button {
    height: 42px;
    background: transparent;
    padding: 0;
    border-radius: 5px;
    border: 0;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;

    font-size: 1rem;

    &:hover {
      background-color: var(--color-background);
    }
  }
`;

export const AddComentContainer = styled.div`
  display: flex;
  align-items: center;

  form {
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 10px;

    input {
      width: 100%;
      height: 40px;
      border: 0;
      outline: 0;
      background: #fff;
      border-radius: 15px 0px 0px 15px;
      font-size: 15px;
      color: #4a4a4a;
      padding-left: 15px;
      border: 1px solid #e3e3e3;
    }
  }
`;

export const Title = styled.div`
  margin-top: 0.8rem;
`;
