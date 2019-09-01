import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Background from '~/components/Background';
import DatePicker from '~/components/DatePicker';
import Footer from '~/components/Footer';
import api from '~/services/api';
import Item from './Item';
import {List, Text} from './styles';

export default function Subscribe() {
  const [meetups, setMeetups] = useState([]);
  const [totalMeetups, setTotalMeetups] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());

  async function loadMeetups(pageNumber = page, refreshing = false) {
    if (pageNumber > totalMeetups && pageNumber > 1) return;

    try {
      setLoading(true);
      const response = await api.get('meets', {
        params: {
          page: pageNumber,
          date: format(date, 'yyyy-MM-dd'),
        },
      });

      const {rows, count} = response.data;

      const responseFormatted = rows.map(item => {
        const dateFormatted = format(
          parseISO(item.date),
          "dd 'de' MMMM', às' k'h'",
          {
            locale: pt,
          },
        );

        return {...item, dateFormatted};
      });

      const newArray = refreshing
        ? responseFormatted
        : [...meetups, ...responseFormatted];

      setTotalMeetups(Math.floor(count / 10));
      setPage(page + 1);
      setMeetups(newArray);
    } catch (error) {
      Alert.alert(
        'Falha',
        `${
          error.response.data
            ? error.response.data.error
            : 'Falha ao carregar os seus Meetups'
        }`,
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeetups();
  }, []);

  useEffect(() => {
    setTotalMeetups(0);
    loadMeetups(1, true);
  }, [date]);

  async function handleOnRefresh() {
    setRefreshing(true);
    await loadMeetups(1, true);
    setRefreshing(false);
  }

  function handleOnEndReached() {
    loadMeetups(page + 1);
  }

  async function handleOnSubscribe(id) {
    try {
      await api.post('/subscription', {meet_id: id});

      const newArray = await meetups.filter(item => item.id !== id);

      setMeetups(newArray);
    } catch (error) {
      Alert.alert(
        'Falha',
        `${
          error.response.data
            ? error.response.data.error
            : 'Falha ao carregar os seus Meetups'
        }`,
      );
    }
  }

  return (
    <Background>
      <DatePicker date={date} onChange={setDate} />
      <List
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Item data={item} onSubscribe={handleOnSubscribe} />
        )}
        ListEmptyComponent={
          <Text>{loading ? '' : 'Não há nenhum meetup nesta data'}</Text>
        }
        onRefresh={handleOnRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => handleOnEndReached()}
        ListFooterComponent={<Footer loading={loading} />}
      />
    </Background>
  );
}

Subscribe.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({tintColor}) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
