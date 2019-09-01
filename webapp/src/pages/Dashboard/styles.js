import styled from 'styled-components';

export const Container = styled.div`
  margin: 0px 20px;
  width: 100%;

  header {
    margin: 50px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  strong {
    color: #ffffff;
    font-size: 32px;
    font-weight: 700;
  }

  button {
    padding: 12px 20px;
    border: none;
    display: flex;
    align-items: center;
    height: 42px;
    border-radius: 4px;
    background-color: #f94d6a;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;

    svg {
      margin-right: 10px;
    }
  }

  ul {
    li {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 62px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.1);
      padding: 20px 30px;

      div {
        display: flex;
        align-items: center;

        time {
          color: rgba(255, 255, 255, 0.6);
          font-family: Helvetica;
          font-size: 16px;
        }

        button {
          background: none;
          margin: 0 0 0 30px;
          padding: 0;
          svg {
            margin: 0;
            padding: 0;
          }
        }
      }

      p {
        color: #ffffff;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
`;
