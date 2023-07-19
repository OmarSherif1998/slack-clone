import React, { useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import { styled } from 'styled-components';
import { db } from './firebase';
import Message from './Message';

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId) // makes sure that there's a roomId, meaning that there's a room clicked on.

    // gets the room's details
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
    // gets the room's messages
  );
  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
                <StarBorderOutlined />
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined />
                Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, name, photoURL } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={name}
                  userImage={photoURL}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            ChannelId={roomId}
            ChannelName={roomDetails?.data().name}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    align-items: center;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  > p {
    display: flex;
    align-items: center;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 10px;
    font-size: 18px;
  }
`;

const ChatContainer = styled.div`
  flex: 0;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 50px;
`;
const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
