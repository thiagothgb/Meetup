import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './styles';
import history from '~/services/history';
import { meetupLoad } from '~/store/modules/meeting/actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetings = useSelector(state => state.meeting.meetings);

  useEffect(() => {
    dispatch(meetupLoad());
  }, [dispatch]);

  function handleNewMeetup() {
    history.push('/meeting/new');
  }

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={handleNewMeetup}>
          <MdAddCircleOutline size={20} color="#fff" />
          Novo meetup
        </button>
      </header>

      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            <p>{meeting.title}</p>
            <div>
              <time>{meeting.dateFormatted}</time>
              <button
                type="button"
                onClick={() => history.push(`/meeting/${meeting.id}`)}
              >
                <MdKeyboardArrowRight size={20} color="#fff" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
