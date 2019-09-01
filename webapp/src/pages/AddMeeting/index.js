import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { isSameDay, isPast } from 'date-fns';
import { Form, Input } from '@rocketseat/unform';
import { setMinutes, getHours, setHours } from 'date-fns/esm';
import DatePicker from '~/components/Datepicker';
import { Container, Button } from './styles';
import BannerInput from '~/components/BannerInput';
import { meetupRegisterRequest } from '~/store/modules/meeting/actions';

export default function AddMeeting() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.meeting.loading);

  const [date, setDate] = useState(
    setHours(setMinutes(new Date(), 0), getHours(new Date()) + 1)
  );
  const [minTime, setMinTime] = useState(new Date());

  useEffect(() => {
    if (date) {
      if (isSameDay(date, new Date())) {
        setMinTime(
          setHours(setMinutes(new Date(), 0), getHours(new Date()) + 1)
        );
      } else if (isPast(date)) {
        setMinTime(setHours(setMinutes(date, 40), 23));
      } else {
        setMinTime(setHours(setMinutes(new Date(), 0), 0));
      }
    }
  }, [date]);

  const schema = Yup.object().shape({
    banner_id: Yup.number('Banner inválido')
      .positive('Banner inválido')
      .required('Banner é obrigatório'),
    title: Yup.string().required('Título do meetup é obrigatório'),
    description: Yup.string().required('A descrição do meetup é obrigatória'),
    date: Yup.date()
      .min(
        setHours(setMinutes(new Date(), 0), getHours(new Date())),
        'Não é permitido selecionar datas passadas!'
      )
      .required('O campo data é obrigatório'),
    location: Yup.string().required('A localização do meetup é obrigatória'),
  });

  function handleSubmit(data) {
    dispatch(meetupRegisterRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <BannerInput name="banner" />
        <Input name="title" placeholder="Título de Meetup" />
        <Input
          name="description"
          multiline
          placeholder="Descrição completa"
          rows="10"
        />
        <DatePicker
          name="date"
          selected={date}
          showTimeSelect
          onChange={e => setDate(e)}
          placeholder="Data do meetup"
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          timeIntervals={60}
          minTime={minTime}
          maxTime={
            isPast(date) ? minTime : setHours(setMinutes(new Date(), 0), 23)
          }
        />
        <Input name="location" placeholder="Localização" />
        <Button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          {loading ? 'Salvando...' : 'Salvar meetup'}
        </Button>
      </Form>
    </Container>
  );
}
