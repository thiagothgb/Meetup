import React, {useState, useMemo} from 'react';
import {DatePickerIOS} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format, addDays, subDays, isSameDay} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import {Container, Button, DateText, Picker} from './styles';

export default function DatePicker({date, onChange}) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(() => {
    return format(date, "dd 'de' MMMM", {locale: pt});
  }, [date]);

  function handleNextDay() {
    onChange(addDays(date, 1));
  }

  function handlePreviusDay() {
    if (isSameDay(date, new Date())) {
      return;
    }
    onChange(subDays(date, 1));
  }

  return (
    <Container>
      <Button onPress={handlePreviusDay}>
        <Icon name="keyboard-arrow-left" color="#fff" size={30} />
      </Button>
      <Button onPress={() => setOpened(!opened)}>
        <DateText>{dateFormatted}</DateText>
      </Button>
      <Button onPress={handleNextDay}>
        <Icon name="keyboard-arrow-right" color="#fff" size={30} />
      </Button>

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
