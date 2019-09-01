import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import meeting from './meeting/reducer';

export default combineReducers({
  auth,
  user,
  meeting,
});
