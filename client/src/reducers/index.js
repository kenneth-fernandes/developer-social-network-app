import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import profileReducer from './profile';
import postReducer from './post';
import userReducer from './user';

// Combines all reduces created
export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  user: userReducer,
});
