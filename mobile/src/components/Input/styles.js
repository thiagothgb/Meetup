import styled from 'styled-components/native';

export const Container = styled.View`

`;

export const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #fff;
`;

export const InputContainer = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(0,0,0, 0.2);
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: "rgba(255,255,255,0.5)"
})`
  flex: 1;
  font-size: 15px;
  padding-left: 10px;
  color: #fff
`;
