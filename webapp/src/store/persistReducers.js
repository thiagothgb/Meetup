import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'botuveraFrete',
      storage,
      whitelist: ['user', 'auth'],
    },
    reducers
  );

  return persistedReducer;
};
