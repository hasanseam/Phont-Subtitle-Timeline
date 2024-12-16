import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SubtitleContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Hergon Grotesk Extra Light', sans-serif;
`;

const SubtitleText = styled.div<{ isAnimating: boolean }>`
  font-size: 24px;
  text-align: center;
  transition: transform 0.3s ease;
  transform: ${props => props.isAnimating ? 'scale(1.1)' : 'scale(1)'};
`;

const SubtitleDisplay: React.FC<{ currentSubtitle: string }> = ({ currentSubtitle }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        setIsAnimating(true); // Start animation when Ctrl is pressed
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey) {
        setIsAnimating(false); // Stop animation when Ctrl is released
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <SubtitleContainer>
      <SubtitleText isAnimating={isAnimating}>
        {currentSubtitle || "No Subtitle"}
      </SubtitleText>
    </SubtitleContainer>
  );
};

export default SubtitleDisplay;
