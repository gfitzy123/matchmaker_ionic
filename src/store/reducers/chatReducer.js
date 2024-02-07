import { GET_CHAT } from "../actions/types";

const initialState = {
  chat: [],
};

function ChatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT: {
      return {
        ...state,
        chat: action.payload.chatData,
      };
    }
    default:
      return state;
  }
}

export default ChatReducer;
