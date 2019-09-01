import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  height: 345px;
  max-width: 470px;
  margin-bottom: 20px;
`;

export const Content = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  line-height: 20px;
  color: #333333;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const WrapperItem = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const Text = styled.Text`
  color: #999999;
  font-size: 13px;
  margin-left: 5px;
`;

export const CancelButton = styled(Button)`
  height: 40px;
  background-color: #d44059;
`;
