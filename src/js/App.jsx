import '../css/App.css';
import React from 'react';
import Homepage from './Homepage';
import Login from './Login';
import Sidebar from './Sidebar';
import Header from './Header';
import Spinner from 'react-spinkit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled } from 'styled-components';
import { auth } from './firebase';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/127px-Slack_icon_2019.svg.png?20200128081203"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContainer>
      </AppLoading>
    );
  }
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />

            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Homepage />} />
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContainer = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
