import React, {useState, useMemo} from 'react';
import {DatePickerIOS} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import {Container, DateButton, DateText, Picker} from './styles';

export default function DatePicker({date, onChange}) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(() => {
    return format(date, "dd 'de' MMMM", {locale: pt});
  }, [date]);

  return (
    <Container>
      <Icon name="event" color="#fff" size={20} />
      <DateButton onPress={() => setOpened(!opened)}>
        <DateText>{dateFormatted}</DateText>
      </DateButton>
      <Icon name="event" color="#fff" size={20} />

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
