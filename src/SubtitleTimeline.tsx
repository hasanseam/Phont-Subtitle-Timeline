import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import subtitlesData from "./output_from_ourAPI.json";

const Container = styled.div`
  width: 100%;
  height: 83%;
  background-color: #000;
  color: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
`;

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Ensure elements stack vertically */
  width: 50%;
  min-width: 100%;
  overflow-x: auto; 
  scroll-behavior: smooth;
  position: relative;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #111;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: #000;
  align-items: center;
  justify-content: flex-start;
  color: white;
  font-size: 14px;
  font-family: Arial, sans-serif;
`;

const RoundedBox = styled.div`
  padding: 8px 16px;
  border: 2px solid white;
  border-radius: 20px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Hergon Grotesk Extra Light', sans-serif;
`;

const TimeSegmentWrapper = styled.div`
  display: flex;
  gap: 0px;
`;

const TimeSegment = styled.div<{ isActive: boolean; hasSubtitle: boolean }>`
  flex: 0 0 40px; 
  flex-shrink: 0; 
  height: 60px;
  background: linear-gradient(to top, rgb(194, 174, 245), #7757e0);
  opacity: ${props => (props.isActive ? 1 : 0.7)};
  border: 1px solid ${props => (props.hasSubtitle ? "#444" : "#222")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1);
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: #fff;
  transform: translateX(-50%);
  z-index: 10;
`;

const TimeDisplay = styled.div`
  text-align: right;
  font-family: "Hergon Grotesk Extra Light", sans-serif;
`;

interface SubtitleTimelineProps {
  onSubtitleChange: (subtitle: string) => void;
}

const SubtitleTimeline: React.FC<SubtitleTimelineProps> = ({ onSubtitleChange }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const calculateTotalDuration = () => {
    if (subtitlesData.length === 0) return 0;
    const lastSubtitle = subtitlesData[subtitlesData.length - 1];
    return lastSubtitle.end_time + 5; // Add 5 seconds to the last subtitle's end_time
  };

  const totalSeconds = Math.ceil(calculateTotalDuration());

  useEffect(() => {
    const activeSubtitle = subtitlesData.find(subtitle => {
      const timeMs = currentTime * 1000;
      const startMs = Math.floor(subtitle.start_time * 1000);
      const endMs = Math.ceil(subtitle.end_time * 1000);
      return timeMs >= startMs && timeMs <= endMs;
    });
  
    if (activeSubtitle) {
      onSubtitleChange(activeSubtitle.subtitle);
    } else {
      onSubtitleChange("");
    }
  }, [currentTime, onSubtitleChange]);

  const hasSubtitleAtTime = (time: number) => {
    return subtitlesData.some(subtitle => {
      const timeMs = time * 1000;
      const startMs = Math.floor(subtitle.start_time * 1000);
      const endMs = Math.ceil(subtitle.end_time * 1000);
      return timeMs >= startMs && timeMs <= endMs;
    });
  };

  const handleSegmentClick = (time: number) => {
    setCurrentTime(time);

    if (timelineRef.current) {
      const segment = timelineRef.current.querySelector(
        `.time-segment-${time}`
      ) as HTMLElement;

      if (segment) {
        const offset =
          segment.offsetLeft -
          timelineRef.current.offsetWidth / 2 +
          segment.offsetWidth / 2;
        timelineRef.current.scrollTo({ left: offset, behavior: "smooth" });
      }
    }
  };

  return (
    <Container>
      <TimelineWrapper ref={timelineRef}>
      <TopContainer>
      <RoundedBox>
         subtitle in rounded box will be here
         </RoundedBox>
         <RoundedBox>
         subtitle in rounded box will be here
         </RoundedBox>
         <RoundedBox>
         subtitle in rounded box will be here
         </RoundedBox>
       </TopContainer>
        <TimeSegmentWrapper>
          {Array.from({ length: totalSeconds }).map((_, time) => (
            <TimeSegment
              key={time}
              className={`time-segment-${time}`}
              isActive={currentTime === time}
              hasSubtitle={hasSubtitleAtTime(time)}
              onClick={() => handleSegmentClick(time)}
            >
            </TimeSegment>
          ))}
        </TimeSegmentWrapper>
      </TimelineWrapper>
      <ActiveIndicator />
      <TimeDisplay>Current Time: {currentTime}s</TimeDisplay>
    </Container>
  );
};

export default SubtitleTimeline;
