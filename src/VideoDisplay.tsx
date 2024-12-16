import React from 'react';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Replay5 } from '@mui/icons-material';
import { Forward5 } from '@mui/icons-material';

const VideoContainer = styled.div`
  height: 100%;
  background-color: #111;
  border-radius: 8px;
  position: relative;
  padding: 20px;
`;

const GradientBox = styled.div`
  width: 20%;
  height: 80%;
  background: linear-gradient(to top, rgb(194, 174, 245), #7757e0);
  border-radius: 8px;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding:5px
`;

const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 36px;
  cursor: pointer;
  
  &:hover {
    color: #ccc;
  }
`;

const VideoDisplay: React.FC = () => {
  return (
    <VideoContainer>
      <GradientBox />
      <ControlsContainer>
        <ControlButton>
          <Replay5 />
        </ControlButton>
        <ControlButton>
          <PlayArrowIcon />
        </ControlButton>
        <ControlButton>
          <Forward5 />
        </ControlButton>
      </ControlsContainer>
    </VideoContainer>
  );
};

export default VideoDisplay;
