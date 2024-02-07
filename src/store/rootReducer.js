import { combineReducers } from "redux";
import AuthReducer from "./reducers/authReducer";
import ChatReducer from './reducers/chatReducer';

const rootReducer = combineReducers({
  AuthReducer,
  ChatReducer
});

export default rootReducer;
