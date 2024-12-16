import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  height: 100%;
  background-color: #000;
  color: white;
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
`;

const Title = styled.span`
  font-size: 16px;
  color: white;
  font-family: 'Hergon Grotesk Extra Light', sans-serif;
`;

const M3Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  margin-right: 12px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    transition: 0.3s;
    border-radius: 20px;
    border: 1px solid #fff;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 3px;
    bottom: 3px;
    background-color: #fff;
    transition: 0.3s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #fff;
    border: 1px solid #000;
  }

  input:checked + .slider:before {
    transform: translateX(16px);
    background-color: #000;
  }
`;

const Sidebar: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <SidebarContainer>
      <HeaderContainer>
        <M3Switch>
          <input 
            type="checkbox" 
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span className="slider"></span>
        </M3Switch>
        <Title>Animation</Title>
      </HeaderContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
