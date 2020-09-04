import styled from 'styled-components';

export const Container = styled.div`
  height: 80px;
  background: var(--color-smia);
  display: flex;
`;

export const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  margin-left: 20px;
`;

export const Botoes = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export const Botao = styled.button`
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  margin: 20px;
  background: none;
  border: none;
`;

export const Title = styled.text`
  color: var(--color-white);
`;
