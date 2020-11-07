import styled from 'styled-components';

export const Container = styled.div`
  background: var(--color-white);
  width: 40%;
  min-width: 40%;
  height: 40%;
  border-radius: 8px;
  padding: 30px;

  @media (max-width: 450px) {
    width: 100%;
  }

  textarea {
    margin-left: 15px;
    margin-right: 15px;
    min-width: 95%;
    min-height: 200px;
    max-width: 700px;
    max-height: 200px;
    border: 1px solid var(--color-separator);
    background: var(--color-textarea);
    border-radius: 8px;
    padding: 10px;
    font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif;

    @media (max-width: 450px) {
      width: 95%;
    }
  }

  footer {
    justify-content: center;
    display: flex;
    button {
      margin-top: 20px;
      width: 250px;
      height: 45px;
      border-radius: 8px;
      border: none;
      background: var(--color-smia);
      font-weight: bold;
      color: var(--color-white);
      transition: background 0.2s;

      &:hover {
        background: var(--color-smia-hover);
      }
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
    font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif;
  }
  button {
    width: 250px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: var(--color-smia);
    font-weight: bold;
    color: var(--color-white);
    transition: background 0.2s;

    &:hover {
      background: var(--color-smia-hover);
    }
  }
`;

export const OptionMap = styled.div`
  display: flex;

  margin: 0 20px;

  min-width: 150px;
  max-width: 700px;
  height: 320px;

  > div {
    display: flex;
    flex: 1;
  }

  @media (max-width: 450px) {
    width: 95%;
  }
`;
