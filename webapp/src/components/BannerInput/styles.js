import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
  margin-top: 50px;

  label {
    height: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 300px;
      width: 100%;
      border-radius: 4px;
      background: #eee;
    }

    p {
      color: rgba(255, 255, 255, 0.3);
      font-size: 20px;
      font-weight: 700;
    }

    input {
      display: none;
    }
  }
`;
