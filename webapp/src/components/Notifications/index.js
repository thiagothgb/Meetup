import React, { useState, useEffect } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistanceToNow } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz/esm';
import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';
import api from '~/services/api';
import { toast } from 'react-toastify';

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [numberUnreads, setNumberUnreads] = useState([]);

  async function loadNotifications() {
    api.get('/notifications').then(response => {
      let Unreaded = 0;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setNumberUnreads(0);

      const formatted = response.data.map(item => {
        const { content, createdAt, read } = item;
        const contentArray = content.split('. ');
        const date = utcToZonedTime(parseISO(createdAt), timezone);
        const timeFormatted = formatDistanceToNow(date, {
          addSuffix: true,
          locale: pt,
        });

        if (!read) {
          Unreaded = Unreaded + 1;
        }
        return { ...item, timeFormatted, contentArray };
      });

      setNumberUnreads(Unreaded);
      setNotifications(formatted);
    });
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  function handleOnRead(id) {
    api
      .put(`/notifications/${id}`)
      .then(() => {
        const result = notifications.map(item =>
          item._id.toString() === id.toString() ? { ...item, read: true } : item
        );

        setNotifications(result);
      })
      .catch(err => {
        toast.error('Não foi possível marcar como lida!');
      });
  }

  return (
    <Container>
      <Badge hasUnread={numberUnreads > 0}>
        <MdNotifications
          color="#0a997f"
          size={20}
          onClick={() => setOpen(!open)}
        />
      </Badge>

      {open && (
        <NotificationList>
          <Scroll>
            {notifications.map(item => {
              const { _id, contentArray, timeFormatted, read } = item;

              return (
                <Notification unread={read} key={_id}>
                  {contentArray.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                  <time>{timeFormatted}</time>
                  {!read && (
                    <button type="button" onClick={() => handleOnRead(_id)}>
                      Marcar como lida
                    </button>
                  )}
                </Notification>
              );
            })}
          </Scroll>
        </NotificationList>
      )}
    </Container>
  );
}
