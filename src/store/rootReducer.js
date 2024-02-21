import { combineReducers } from "redux";
import AuthReducer from "./reducers/authReducer";
import ChatReducer from './reducers/chatReducer';
import HomeReducer from './reducers/homeReducer';

const rootReducer = combineReducers({
  AuthReducer,
  ChatReducer,
  HomeReducer
});

export default rootReducer;
