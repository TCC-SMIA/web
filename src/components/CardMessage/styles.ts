import styled from 'styled-components';

export const Container = styled.div`
  background: #ededed;
  margin-top: 10vh;
  height: 90vh;
  display: flex;
`;

export const SideBar = styled.div`
  width: 35%;
  max-width: 415px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

export const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;

  img {
    margin-right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
  }

  h1 {
    font-size: 16px;
  }
`;

export const ChatList = styled.div`
  flex: 1;
  background: white;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const ContentArea = styled.div`
  flex: 1;
`;
