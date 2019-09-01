import styled from 'styled-components';

export const Container = styled.header`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 970px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;

    strong {
      display: block;
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
    }

    a {
      display: block;
      margin-top: 2px;
      color: #999999;
      font-size: 14px;
    }
  }

  button {
    border: none;
    margin-left: 30px;
    height: 42px;
    border-radius: 4px;
    background-color: #d44059;
    width: 71px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
  }
`;
