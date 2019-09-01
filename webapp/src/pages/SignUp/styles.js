import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  opacity: 0.9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 50px;
  }

  > a {
    display: flex;
    margin: 20px 0px;
    align-self: stretch;
    justify-content: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 700;
    transition: color 0.2s;

    &:hover {
      color: ${darken(0.01, '#fff')};
      cursor: pointer;
    }
  }
`;
