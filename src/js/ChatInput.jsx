import React, { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from 'styled-components';
import { db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import firebase from 'firebase/compat/app';

function ChatInput({ ChannelId, ChannelName, chatRef }) {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);
  console.log('user ' + user.displayName);
  const sendMessage = (e) => {
    e.preventDefault();

    if (!ChannelId) {
      alert('You need to choose a channel before sending a message ');
      return false;
    }

    db.collection('rooms').doc(ChannelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      name: user.displayName,
      photoURL: user.photoURL,
    });
    chatRef.current.scrollIntoView({ behavior: 'smooth' });
    setInput('');
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${ChannelName ? 'Message #' + ChannelName : ''}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none;
  }
`;
