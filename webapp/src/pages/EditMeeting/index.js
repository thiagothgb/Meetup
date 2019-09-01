import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { parseISO, isSameDay, isPast, isBefore } from 'date-fns';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { setMinutes, getHours, setHours } from 'date-fns/esm';
import PropTypes from 'prop-types';
import DatePicker from '~/components/Datepicker';
import { Container, Button } from './styles';
import BannerInput from '~/components/BannerInput';
import api from '~/services/api';
import { meetupUpdateRequest } from '~/store/modules/meeting/actions';
import Loading from '~/components/Loading';
import history from '~/services/history';

export default function EditMeeting({ match }) {
  const { idMeet } = match.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [meet, setMeet] = useState({});
  const [minTime, setMinTime] = useState(new Date());

  useEffect(() => {
    async function loadMeet() {
      try {
        setLoading(true);
        const response = await api.get(`/manager/${idMeet}`);
        const date = parseISO(response.data.date);

        if (isBefore(date, new Date())) {
          history.push('/404');
        }

        setMeet({ ...response.data, date });
      } catch (err) {
        setMeet({});
        toast.error('Não foi possível localizar esse meetup!');
      } finally {
        setLoading(false);
      }
    }
    loadMeet();
  }, [idMeet]);

  useEffect(() => {
    if (meet.date) {
      if (isSameDay(meet.date, new Date())) {
        setMinTime(
          setHours(setMinutes(new Date(), 0), getHours(new Date()) + 1)
        );
      } else if (isPast(meet.date)) {
        setMinTime(setHours(setMinutes(meet.date, 40), 23));
      } else {
        setMinTime(setHours(setMinutes(new Date(), 0), 0));
      }
    }
  }, [meet.date]);

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
    const { title, description, location, date, banner_id } = data;
    dispatch(
      meetupUpdateRequest({
        id: idMeet,
        title,
        description,
        location,
        date,
        banner_id,
      })
    );
  }

  function handleChangeDescription(description) {
    setMeet({ ...meet, description });
  }

  function handleChangeDate(date) {
    setMeet({ ...meet, date });
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Form onSubmit={handleSubmit} schema={schema} initialData={meet}>
          <BannerInput name="banner" />
          <Input name="title" placeholder="Título de Meetup" />
          <Input
            name="description"
            multiline
            placeholder="Descrição completa"
            rows="10"
            onChange={e => handleChangeDescription(e.target.value)}
            value={meet.description}
          />
          <DatePicker
            name="date"
            selected={meet.date}
            showTimeSelect
            onChange={e => handleChangeDate(e)}
            placeholder="Data do meetup"
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            timeIntervals={60}
            minTime={minTime}
            maxTime={
              isPast(meet.date)
                ? minTime
                : setHours(setMinutes(new Date(), 0), 23)
            }
          />
          <Input name="location" placeholder="Localização" />
          <Button type="submit">
            <MdAddCircleOutline size={20} color="#fff" />
            {loading ? 'Salvando...' : 'Salvar meetup'}
          </Button>
        </Form>
      )}
    </Container>
  );
}

EditMeeting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idMeet: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
