import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
`;

export const Feed = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;

  display: flex;
  flex-direction: column;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
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
    padding: 16px 24px;
    font-size: 1rem;
    margin: 0 8px;
  }

  option {
    font-size: 0.9rem;
  }

  svg {
    position: absolute;
    right: 16px;
  }
`;
