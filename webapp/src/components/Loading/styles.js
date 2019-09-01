import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 2s linear infinite;
  }

  strong {
    font-size: 30px;
    color: rgba(255, 255, 255, 0.6);
  }
`;
