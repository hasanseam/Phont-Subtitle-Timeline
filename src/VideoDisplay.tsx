import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  height: 100%;
  background-color: #111;
  border-radius: 8px;
`;

const VideoDisplay: React.FC = () => {
  return (
    <VideoContainer>
      {/* Video player content */}
    </VideoContainer>
  );
};

export default VideoDisplay;