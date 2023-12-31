import React from 'react';
import { styled } from 'styled-components';
import { db } from './firebase';
import { enterRoom } from '../features/appSlice';
import { useDispatch } from 'react-redux';

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();
  const addChannel = () => {
    const channelName = prompt('Please enter your name');
    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <HoverContainer>
      <SidebarOptionContainer
        onClick={addChannelOption ? addChannel : selectChannel}
      >
        {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <SidebarOptionChannel>
            <span>#</span>
            {title}
          </SidebarOptionChannel>
        )}
      </SidebarOptionContainer>
    </HoverContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  position: relative; /* Add this line */
  font-size: 13px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  > h3 {
    font-weight: 400;
  }
  > h3 > span {
    padding: 15px;
  }
`;
const HoverContainer = styled.div`
  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
