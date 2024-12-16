import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import subtitlesData from "./output_from_ourAPI.json";

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 200px;
  background-color: #000;
  color: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden; /* Prevent overflow outside the container */
`;

const TimelineWrapper = styled.div`
  display: flex;
  width: 50%;
  min-width: 100%;
  overflow-x: auto; /* Allow horizontal scroll */
  gap: 4px;
  scroll-behavior: smooth;
  position: relative;
  flex-shrink: 0; /* Prevent shrinking of the timeline wrapper */

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

const TimelineProgress = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background-color: #fff;
  width: ${props => props.progress}%;
  transition: width 0.3s linear;
`;

const TimeSegment = styled.div<{ isActive: boolean; hasSubtitle: boolean }>`
  flex: 0 0 80px; /* Fixed width for each segment */
  flex-shrink: 0; /* Prevent the segment from shrinking */
  height: 60px;
  background: linear-gradient(to top, #7757e0, #a485f0);
  opacity: ${props => (props.isActive ? 1 : 0.7)};
  border: 1px solid ${props => (props.hasSubtitle ? "#444" : "#222")};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
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
  const totalSeconds = 40; // Total duration (adjust as needed)

  // Update subtitle when currentTime changes
// Update the useEffect for consistent subtitle display
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
      // Convert all times to milliseconds for precise comparison
      const timeMs = time * 1000;
      const startMs = Math.floor(subtitle.start_time * 1000);
      const endMs = Math.ceil(subtitle.end_time * 1000);
      
      // Check if the current time falls within any subtitle's range
      return timeMs >= startMs && timeMs <= endMs;
    });
  };

  const progress = (currentTime / totalSeconds) * 100;

  // Scroll to clicked segment and center it
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
        <TimelineProgress progress={progress} />
        {Array.from({ length: totalSeconds }).map((_, time) => (
          <TimeSegment
            key={time}
            className={`time-segment-${time}`}
            isActive={currentTime === time}
            hasSubtitle={hasSubtitleAtTime(time)}
            onClick={() => handleSegmentClick(time)}
          >
            {time}s
          </TimeSegment>
        ))}
      </TimelineWrapper>
      <ActiveIndicator />
      <TimeDisplay>Current Time: {currentTime}s</TimeDisplay>
    </Container>
  );
};

export default SubtitleTimeline;
