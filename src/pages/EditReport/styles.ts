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

  @media (min-width: 500px) {
    width: 500px;
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
  @media (max-width: 450px) {
    margin: 20px 6px;
    p {
      text-align: center;
    }
    input {
      width: 100%;
      height: 35px;
      border-radius: 8px;
      border: 1px solid var(--color-separator-border);
      background: var(--color-textarea);
      padding: 10px;
      font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif;
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
    z-index: 0;
  }

  @media (max-width: 450px) {
    width: 95%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchSelect = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: var(--color-white);
    border-radius: 8px;
    border: 0;
    padding: 16px 0 16px 42px;
    font-size: 1rem;
  }

  option {
    font-size: 0.9rem;
  }

  svg {
    position: absolute;
    right: 8px;
  }

  @media (max-width: 450px) {
    width: 70%;

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: var(--color-white);
      border-radius: 8px;
      border: 0;
      padding: 12px 2px;
      font-size: 1rem;
      max-width: 100%;
      min-width: 180px;
    }

    option {
      font-size: 0.8rem;
    }

    svg {
      position: absolute;
      right: 6px;
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  img {
    width: 100%;
  }
  label {
    position: absolute;
    color: var(--color-background);
    background: var(--color-smia);
    border-radius: 10px;
    padding: 6px;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background-color: var(--color-title-green);
    }
  }
`;
