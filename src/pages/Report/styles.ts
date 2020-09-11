import styled from 'styled-components';

export const Container = styled.div`
  background: var(--color-white);
  width: 40%;
  height: 40%;
  border-radius: 8px;
  padding: 30px;

  textarea {
    margin-left: 15px;
    margin-right: 15px;
    min-width: 465px;
    min-height: 200px;
    max-width: 465px;
    max-height: 200px;
    border: 1px solid var(--color-separator);
    background: var(--color-textarea);
    border-radius: 8px;
    padding: 10px;
  }

  footer {
    justify-content: center;
    display: flex;
    button {
      margin-top: 20px;
      width: 250px;
      height: 30px;
      border-radius: 8px;
      border: none;
      background: var(--color-smia);
      font-weight: bold;
      color: var(--color-white);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;
  margin: 20px;

  p {
    color: #9c98a6;
  }
  input {
    width: 250px;
    height: 35px;
    border-radius: 8px;
    border: 1px solid var(--color-separator-border);
    background: var(--color-textarea);
    padding: 10px;
  }
  button {
    width: 250px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: var(--color-smia);
    font-weight: bold;
    color: var(--color-white);
  }
`;
