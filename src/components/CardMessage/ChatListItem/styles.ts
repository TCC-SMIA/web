import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 60px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 15px;
  }

  :hover {
    background: #f5f5f5;
  }
`;

export const ChatLines = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #eee;
  padding-right: 15px;
  margin-left: 15px;

  flex-wrap: wrap;
  min-width: 0px;
`;

export const ChatLine = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ChatListName = styled.text`
  font-size: 17px;
  color: black;
`;

export const ChatListDate = styled.text`
  font-size: 12px;
  color: #999;
`;

export const ChatListLastMessage = styled.text`
  font-size: 14px;
  color: #999;
  display: flex;
  width: 100%;
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }
`;
