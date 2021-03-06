import React, {useMemo} from 'react';
import {DatePickerAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format, addDays, subDays, isSameDay} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import {Container, Button, DateText} from './styles';

export default function DatePicker({date, onChange}) {
  const dateFormatted = useMemo(() => {
    return format(date, "dd 'de' MMMM", {locale: pt});
  }, [date]);

  async function handleOpenPicker() {
    const {action, year, month, day} = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);

      onChange(selectedDate);
    }
  }

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
      <Button onPress={handleOpenPicker}>
        <DateText>{dateFormatted}</DateText>
      </Button>
      <Button onPress={handleNextDay}>
        <Icon name="keyboard-arrow-right" color="#fff" size={30} />
      </Button>
    </Container>
  );
}

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
