import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 30px;

  img {
    width: 750px;
    border-radius: 10px;
    margin: 10px 0;
  }

  & + div {
    margin-top: 2rem;
  }
`;

export const Header = styled.div``;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  p {
    margin-left: 10px;
  }
`;

export const Description = styled.div``;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;

  button {
    background: transparent;
    padding: 5px;
    border-radius: 5px;
  }
`;
