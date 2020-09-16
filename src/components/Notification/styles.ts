import styled, { css } from 'styled-components';

interface NotificationProps {
  isVisible: boolean;
}

export const Container = styled.div<NotificationProps>`
  position: absolute;
  width: 300px;
  height: 300px;
  top: calc(80px + 0px);
  background: var(--color-white);
  border-radius: 0px 0px 8px 8px;
  border: 1px solid var(--color-smia);
  opacity: 0;
  visibility: hidden;
  z-index: 10;

  box-shadow: 5px 7px 5px rgb(61, 61, 61, 0.5);

  ${(props) =>
    props.isVisible &&
    css`
      display: block;
      opacity: 1;
      visibility: visible;
    `}

  > div {
    padding: 12px 0 0 6px;
  }
  h1 {
    font-size: 1.5rem;
    color: var(--color-notification);
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-bottom: 1px solid var(--color-icons);

  p {
    color: var(--color-notification);
  }
`;
