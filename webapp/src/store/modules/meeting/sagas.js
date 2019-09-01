import { call, takeLatest, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  meetupFailed,
  meetupRegisterSuccess,
  meetupLoadSuccess,
  meetupUpdateSuccess,
  meetupDeleteSuccess,
} from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* meetLoad() {
  try {
    const response = yield call(api.get, 'manager');

    const meets = response.data.map(meet => {
      const dateFormatted = format(
        parseISO(meet.date),
        "dd 'de' MMMM', às' k'h'",
        { locale: pt }
      );

      return {
        ...meet,
        dateFormatted,
      };
    });

    yield put(meetupLoadSuccess(meets));
  } catch (error) {
    toast.error(
      `${
        error.response.data
          ? error.response.data.error
          : 'Falha ao carregar os seus Meetups'
      }`
    );
    yield put(meetupFailed());
  }
}

export function* meetRegisterRequest({ payload }) {
  try {
    const response = yield call(api.post, 'meets', payload);

    yield put(meetupRegisterSuccess(response.data));

    toast.success('Meetup cadastrado com sucesso!');

    history.push('/dashboard');
  } catch (error) {
    toast.error(
      `${
        error.response.data
          ? error.response.data.error
          : 'Falha ao criar meetup'
      }`
    );
    yield put(meetupFailed());
  }
}

export function* meetRegisterUpdate({ payload }) {
  try {
    const response = yield call(api.post, `meets/${payload.id}`, payload);

    const dateFormatted = format(
      parseISO(response.data.date),
      "dd 'de' MMMM, 'às' k'h'",
      { locale: pt }
    );

    toast.success('Meetup atualizado com sucesso!');

    history.push('/dashboard');

    yield put(meetupUpdateSuccess({ ...response.data, dateFormatted }));
  } catch (error) {
    toast.error(
      `${
        error.response.data
          ? error.response.data.error
          : 'Falha ao carregar os seus Meetups'
      }`
    );
    yield put(meetupFailed());
  }
}

export function* meetupDeleteRequest({ payload }) {
  try {
    yield call(api.delete, `meets/${payload}`);

    toast.success('Meetup removido com sucesso!');

    history.push('/dashboard');

    yield put(meetupDeleteSuccess(payload));
  } catch (error) {
    toast.error(
      `${
        error.response.data
          ? error.response.data.error
          : 'Falha ao carregar os seus Meetups'
      }`
    );
  }
}
export default all([
  takeLatest('@meeting/MEETING_LOAD_REQUEST', meetLoad),
  takeLatest('@meeting/MEETING_REGISTER_REQUEST', meetRegisterRequest),
  takeLatest('@meeting/MEETING_UPDATE_REQUEST', meetRegisterUpdate),
  takeLatest('@meeting/MEETING_DELETE_REQUEST', meetupDeleteRequest),
]);
