import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})`
  flex: 1;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const Divider = styled.View`
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 15px;
  color: #e5556e;
`;
