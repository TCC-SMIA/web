import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 20px;
  transition: 0.2s;
  background: var(--color-white);

  & + div {
    margin-top: 8px;
  }

  input {
    border: 0;
    font-size: 1.2rem;
    width: 300px;
    color: var(--color-input);

    ::placeholder {
      color: var(--color-placeholder);
    }
  }
`;
