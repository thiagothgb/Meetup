import React from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Image,
  Content,
  Title,
  WrapperItem,
  Text,
  CancelButton,
} from './styles';

export default function Item({data, onSubscribe}) {
  const {id, title, location, dateFormatted, manager, banner} = data;

  function handleOnSubscribe() {
    Alert.alert(
      'Confirmar inscrição?',
      `Deseja realmente confirmar a inscrição no evento ${title}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'Confirmar', onPress: () => onSubscribe(id)},
      ],
      {cancelable: false},
    );
  }

  return (
    <Container>
      <Image source={{uri: banner.url}} />
      <Content>
        <Title>{title}</Title>
        <WrapperItem>
          <Icon name="event" size={14} color="#999999" />
          <Text>{dateFormatted}</Text>
        </WrapperItem>
        <WrapperItem>
          <Icon name="place" size={14} color="#999999" />
          <Text>{location}</Text>
        </WrapperItem>
        <WrapperItem>
          <Icon name="person" size={14} color="#999999" />
          <Text>{`Organizador: ${manager.name}`}</Text>
        </WrapperItem>
        <CancelButton onPress={handleOnSubscribe}>
          Realizar inscrição
        </CancelButton>
      </Content>
    </Container>
  );
}
