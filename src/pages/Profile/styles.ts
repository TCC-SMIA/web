import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContent = styled.div`
  min-width: 500px;
  align-items: center;
  margin-top: 2rem;

  form {
    display: flex;
    flex-direction: column;
  }

  button {
    align-self: center;
  }
`;

export const AvatarContainer = styled.div`
  margin-top: 2rem;

  img {
    width: 240px;
    height: 240px;
    border-radius: 50%;
  }
`;
