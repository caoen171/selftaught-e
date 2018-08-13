import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import textestReducer from './texttestReducer';
import videoReducer from './videoReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  form: reduxForm,
  video: videoReducer,
  texttest: textestReducer 
});