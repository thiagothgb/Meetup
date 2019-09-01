import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 40px 20px;

  p {
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 40px;
  }

  button {
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: none;
    padding: 30px;
    margin: 30px;
    font-size: 40px;
    color: rgba(255, 255, 255, 0.6);
  }
`;
