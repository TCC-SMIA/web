import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  position: relative;
  margin-top: 10px;
  width: 80%;
  height: 46px;
  border-radius: 10px;
  border: none;
  background: var(--color-bg-button);
  color: var(--color-white);
  font-weight: bold;
  font-size: 1.2rem;
  transition: 0.2s;
  letter-spacing: 0.1rem;

  &:hover {
    background: ${shade(0.2, `#0A2342`)};
  }
`;
