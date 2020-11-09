import styled from 'styled-components';

export const Loading = styled.div`
  position: absolute;
  display: flex;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
`;

export const Object = styled.div`
  width: 6px;
  height: 40px;
  background: var(--color-smia);
  margin: 0 3px;
  border-radius: 10px;
  animation: loading 0.8s infinite;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }

  &:nth-child(4) {
    animation-delay: 0.3s;
  }

  &:nth-child(5) {
    animation-delay: 0.4s;
  }

  &:nth-child(6) {
    animation-delay: 0.5s;
  }

  &:nth-child(7) {
    animation-delay: 0.6s;
  }

  &:nth-child(8) {
    animation-delay: 0.7s;
  }

  @keyframes loading {
    0% {
      height: 0;
    }
    50% {
      height: 40px;
    }
    100% {
      height: 0;
    }
  }
`;
