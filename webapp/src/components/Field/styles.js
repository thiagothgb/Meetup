import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  color: ${props => (props.error ? '#f65c75' : '#000')};
  flex-direction: column;
  margin-right: 10px;
  span {
    font-size: 15px;
  }

  input {
    width: 100%;
    margin-top: 5px;
    padding: 10px 5px;
    border: 1px solid #1117;
    border-radius: 4px;
  }
`;
