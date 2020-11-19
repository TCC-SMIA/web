import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Feed = styled.div`
  margin: 12px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
    padding: 16px 24px;
    font-size: 1rem;
    margin: 4px 8px;
  }

  option {
    font-size: 0.9rem;
  }

  svg {
    position: absolute;
    right: 16px;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;

  h2 {
    color: var(--color-smia);
    margin: 8px;
  }

  img {
    width: 100%;
  }
`;
