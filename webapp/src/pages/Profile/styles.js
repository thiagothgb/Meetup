import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  margin: 50px auto;
  width: 100%;
  padding: 0 20px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    hr {
      height: 1px;
      background-color: #ffffff;
      opacity: 0.1;
      margin: 20px 0px;
    }

    input,
    textarea {
      min-height: 50px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      padding: 14px 20px 10px 20px;
      margin-bottom: 10px;
      color: #fff;

      &::placeholder {
        opacity: 0.5;
        color: #ffffff;
      }
    }

    & span {
      color: #f94d6a;
      margin-bottom: 5px;
    }
  }
`;

export const Button = styled.button`
  width: 180px;
  border: none;
  height: 50px;
  border-radius: 4px;
  background-color: #f94d6a;
  color: #ffffff;
  padding: 13px;
  font-size: 16px;
  font-weight: 700;
  margin: 5px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: ${lighten(0.1, '#f94d6a')};
  }
`;
