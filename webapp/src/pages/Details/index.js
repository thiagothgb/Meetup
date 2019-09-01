import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdEdit, MdEvent } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import api from '~/services/api';
import history from '~/services/history';
import { Container } from './styles';
import { meetupDeleteRequest } from '~/store/modules/meeting/actions';

export default function Details({ match }) {
  const { idMeet } = match.params;
  const [loading, setLoading] = useState(true);
  const [meet, setMeet] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadMeet() {
      try {
        setLoading(true);
        const response = await api.get(`/manager/${idMeet}`);

        if (response.data) {
          const { date } = response.data;
          const dateFormatted = format(
            parseISO(date),
            "dd 'de' MMMM, 'às' k'h'",
            { locale: pt }
          );

          const isPast = isBefore(parseISO(date), new Date());
          setMeet(Object.assign(response.data, { dateFormatted }, { isPast }));
        }
      } catch (err) {
        setMeet({});
        toast.error('Não foi possível localizar esse meetup!');
      } finally {
        setLoading(false);
      }
    }
    loadMeet();
  }, [idMeet]);

  function handleRemoveMeet(id) {
    dispatch(meetupDeleteRequest(id));
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <strong>{meet.title}</strong>
            <div>
              {!meet.isPast && (
                <>
                  <button
                    color="primary"
                    type="button"
                    onClick={() => history.push(`/meeting/${meet.id}/edit`)}
                  >
                    <MdEdit size={20} color="#fff" />
                    Editar
                  </button>
                  <button
                    style={{ background: '#f94d6a' }}
                    type="button"
                    onClick={() => handleRemoveMeet(meet.id)}
                  >
                    <MdDeleteForever size={20} color="#fff" />
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </header>

          <div>
            <img src={meet.banner.url} alt={meet.title} />
            <p>{meet.description}</p>
          </div>
          <div className="wrapper-footer-details">
            <p>
              <MdEvent size={20} />
              {meet.dateFormatted}
            </p>
            <p>
              <FaMapMarkerAlt size={20} />
              {meet.location}
            </p>
          </div>
        </>
      )}
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idMeet: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
