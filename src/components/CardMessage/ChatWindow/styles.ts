import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  height: 60px;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 15px;
    margin-right: 15px;
  }

  h1 {
    font-size: 17px;
    color: #000;
    font-weight: normal;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const HeaderBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  background-size: cover;
  background-position: center;
  background: #dbead5;
  padding: 20px 30px;
`;

export const ButtonSend = styled.div`
  width: 40px;
  height: 40px;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0px 15px 15px 0px;
`;

export const Footer = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
  padding: 15px;

  input {
    width: 100%;
    height: 40px;
    border: 0;
    outline: 0;
    background: #fff;
    border-radius: 15px 0px 0px 15px;
    font-size: 15px;
    color: #4a4a4a;
    padding-left: 15px;
  }
`;
