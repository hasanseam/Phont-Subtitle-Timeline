import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import VideoDisplay from './VideoDisplay';
import SubtitleDisplay from './SubtitleDisplay';
import SubtitleTimeline from './SubtitleTimeline';

const DisplayContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding-left: 250px;
`;

const LeftColumn = styled.div`
  flex: 1;

  padding: 20px;
`;

const RightColumn = styled.div`
  flex: 3;
  display: flex;
`;

const RightColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  padding: 20px;
`;

const VideoSection = styled.div`
  flex: 3;
  min-height: 50%;
`;

const SubtitleSection = styled.div`
  flex: 1;
  min-height: 20%;
`;

const TimelineSection = styled.div`
  flex: 2;
  min-height: 30%;
`;

const Display: React.FC = () => {
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleSubtitleChange = (subtitle: string) => {
    setCurrentSubtitle(subtitle);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <DisplayContainer>
      <LeftColumn>
        <Sidebar />
      </LeftColumn>
      <RightColumn>
        <RightColumnContent>
          <VideoSection>
            <VideoDisplay />
          </VideoSection>
          <SubtitleSection>
            <SubtitleDisplay 
              currentSubtitle={currentSubtitle} 
            />
          </SubtitleSection>
          <TimelineSection>
            <SubtitleTimeline 
              onSubtitleChange={handleSubtitleChange}
            />
          </TimelineSection>
        </RightColumnContent>
      </RightColumn>
    </DisplayContainer>
  );
};

export default Display;
