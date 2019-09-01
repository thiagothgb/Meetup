import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c 0%, #402845 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    input {
      width: 315px;
      height: 50px;
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

    button {
      border: none;
      height: 50px;
      border-radius: 4px;
      background-color: #f94d6a;
      color: #ffffff;
      padding: 13px;
      font-size: 18px;
      font-weight: 700;
      margin: 5px 0px;

      &:hover {
        background: ${lighten(0.1, '#f94d6a')};
      }
    }
  }
`;
