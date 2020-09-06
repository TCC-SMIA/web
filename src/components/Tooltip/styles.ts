import styled, { css } from 'styled-components';

interface TooltipProps {
  isVisible: boolean;
}

export const Container = styled.div<TooltipProps>`
  position: absolute;
  width: 100px;
  height: 90px;
  top: calc(80px + 0px);
  background: #426d49;
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
    border-bottom: 10px solid #426d49;
  }
`;

export const MenuToolTip = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #426d49;
  align-items: center;

  > a {
    display: flex;
    background: #426d49;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    width: 100%;
    transition: 0.4s;
    font-weight: bold;

    & + a {
      margin-top: 1px;
    }

    p {
      font-size: 14px;
      color: #fff;
      transition: 0.1s;
    }

    :hover {
      p {
        color: #dcdcdc;
      }
    }
  }
`;
