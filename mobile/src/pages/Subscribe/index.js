import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Background from '~/components/Background';
import Footer from '~/components/Footer';
import api from '~/services/api';
import Item from './Item';
import {List, Text} from './styles';

export default function Subscribe() {
  const [subscribes, setSubscribes] = useState([]);
  const [totalSubscribes, setTotalSubscribes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  async function loadSubscriptions(pageNumber = page, refreshing = false) {
    if (pageNumber > totalSubscribes && pageNumber > 1) return;

    try {
      setLoading(true);
      const response = await api.get('subscription', {
        params: {
          page: pageNumber,
        },
      });

      const {rows, count} = response.data;

      const responseFormatted = rows.map(item => {
        const {meet} = item;
        const dateFormatted = format(
          parseISO(meet.date),
          "dd 'de' MMMM', às' k'h'",
          {
            locale: pt,
          },
        );

        return {...item, meet: {...meet, dateFormatted}};
      });

      const newArray = refreshing
        ? responseFormatted
        : [...subscribes, ...responseFormatted];

      setTotalSubscribes(Math.floor(count / 10));
      setPage(page + 1);
      setSubscribes(newArray);
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
    loadSubscriptions();
  }, []);

  async function handleOnRefresh() {
    setRefreshing(true);
    await loadSubscriptions();
    setRefreshing(false);
  }

  function handleOnEndReached() {
    loadSubscriptions(page + 1);
  }

  async function handleOnCancelSubscribe(id) {
    try {
      await api.delete(`/subscription/${id}`);

      setSubscribes(subscribes.filter(item => item.id !== id));
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
      <List
        data={subscribes}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Item data={item} onCancelSubscribe={handleOnCancelSubscribe} />
        )}
        ListEmptyComponent={
          <Text>{loading ? '' : 'Você não tem inscrições ativas'}</Text>
        }
        onRefresh={handleOnRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.3}
        onEndReached={handleOnEndReached}
        ListFooterComponent={<Footer loading={loading} />}
      />
    </Background>
  );
}

Subscribe.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({tintColor}) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
