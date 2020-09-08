import styled, { css } from 'styled-components';

interface TooltipProps {
  isVisible: boolean;
}

export const Container = styled.div<TooltipProps>`
  position: absolute;
  width: 100px;
  height: 90px;
  top: calc(80px + 0px);
  background: var(--color-smia);
  border-radius: 0px 0px 8px 8px;
  padding: 1px 1px 1px 1px;
  opacity: 0;
  visibility: hidden;
  z-index: 10;

  ${(props) =>
    props.isVisible &&
    css`
      display: block;
      opacity: 1;
      visibility: visible;
    `}

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--color-smia);
  }
`;

export const MenuToolTip = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--color-smia);
  align-items: center;

  > a {
    display: flex;
    background: var(--color-smia);
    padding: 10px;
    border-radius: 5px;
    color: var(--color-white);
    width: 100%;
    transition: 0.4s;
    font-weight: bold;

    & + a {
      margin-top: 1px;
    }

    p {
      font-size: 14px;
      color: var(--color-white);
      transition: 0.1s;
    }

    :hover {
      p {
        color: var(--color-hover-tooltip);
      }
    }
  }
`;
