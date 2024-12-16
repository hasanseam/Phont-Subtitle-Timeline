import React from 'react';
import styled from 'styled-components';
import Logo from './assets/image.png'; // Add your logo path

const LeftbarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color:rgb(0, 0, 0);
  transition: width 0.3s ease;
  
  @media (min-width: 768px) {
    width: 250px;
  }
  
  @media (max-width: 767px) {
    width: 80px;
  }
`;

const LogoContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
    
    @media (min-width: 768px) {
      width: 100px;
    }
    
    @media (max-width: 767px) {
      width: 40px;
    }
  }
`;

const Leftbar: React.FC = () => {
  return (
    <LeftbarContainer>
      <LogoContainer>
      <img src={Logo} alt="Logo" />
      </LogoContainer>
    </LeftbarContainer>
  );
};

export default Leftbar;
