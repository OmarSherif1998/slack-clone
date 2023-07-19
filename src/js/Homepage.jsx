import React from 'react';
import Chat from './Chat';
import { styled } from 'styled-components';

function Homepage() {
  return (
    <HomepageBody className="homepage">
      <Chat />
    </HomepageBody>
  );
}

export default Homepage;

const HomepageBody = styled.div`
  display: flex;
  flex: 0.9;
  height: 100vh;
  width: 100vw;
`;
