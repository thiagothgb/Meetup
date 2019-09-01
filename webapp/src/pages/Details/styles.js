import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 20px;
  width: 100%;
  max-width: 970px;

  header {
    margin: 50px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #ffffff;
      font-size: 32px;
      font-weight: 700;
    }

    div {
      display: flex;

      button {
        padding: 12px 20px;
        border: none;
        display: flex;
        align-items: center;
        height: 42px;
        border-radius: 4px;
        background-color: #4dbaf9;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;

        svg {
          margin-right: 10px;
        }

        & {
          margin-left: 10px;
        }
      }
    }
  }

  & div {
    p {
      margin-top: 25px;
      color: #ffffff;
      font-size: 18px;
      line-height: 32px;
    }

    img {
      width: 100%;
      height: 300px;
    }
  }

  .wrapper-footer-details {
    display: flex;
    align-items: center;
    margin-top: 5px;
    * {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
    }

    p {
      display: flex;
      align-items: center;
      margin-right: 30px;

      svg {
        margin-right: 10px;
      }
    }
  }
`;
