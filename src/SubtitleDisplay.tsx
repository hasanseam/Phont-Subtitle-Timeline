import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe for zooming and italicizing each character independently
const zoomItalicCharacterAnimation = keyframes`
  0% { 
    transform: scale(1) rotate(0deg); /* Initial state (normal) */
    opacity: 1;
  }
  50% { 
    transform: scale(1.3) rotate(10deg); /* Zoom and tilt (italicize) */
    opacity: 1;
  }
  100% { 
    transform: scale(1) rotate(0deg); /* Return to normal state */
    opacity: 1;
  }
`;

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
  overflow: hidden;
  perspective: 400px;
  white-space: nowrap; /* Keep text in one line */
`;

const SubtitleText = styled.div<{ isAnimating: boolean }>`
  font-size: 24px;
  text-align: center;
  display: inline-flex;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  
  /* Apply animation to each character independently */
  span {
    display: inline-block;
    animation: ${props => props.isAnimating ? zoomItalicCharacterAnimation : 'none'} 0.8s ease-in-out forwards;
    opacity: 1; /* Ensure no fading happens */
  }
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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Split the currentSubtitle into words, then into individual characters for animation
  const words = currentSubtitle.split(' ');

  return (
    <SubtitleContainer>
      <SubtitleText isAnimating={isAnimating}>
        {words.map((word, wordIndex) => (
          <>
            {/* For each word, split it into individual characters and animate them */}
            {word.split('').map((char, charIndex) => (
              <span key={`${wordIndex}-${charIndex}`}>{char}</span>
            ))}
            {/* Add space between words */}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </>
        ))}
      </SubtitleText>
    </SubtitleContainer>
  );
};

export default SubtitleDisplay;
