import React from 'react';
import { styled } from 'styled-components';

function Message({ message, timestamp, user, userImage }) {
  return (
    <MessageContainer>
      <img src={userImage} alt="img" />
      <MessageInfo>
        <h4>{user}</h4>
        <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;
  > h4 {
    font-weight: 200;
    font-family: 'Times New Roman', Times, serif;
  }
  > span {
    color: grey;
    font-weight: 100;
    font-size: 10px;
  }
`;
