const initialState = {
  toggle: false,
};

function HomeReducer(state = initialState, action) {
  console.log({ action });
  switch (action.type) {
    case "CONFIRM_RESULT": {
      return {
        ...state,
        confirmResult: action.result,
      };
    }
    case "Toggle": {
      return {
        ...state,
        toggle: action.toggle,
      };
    }
    default:
      return state;
  }
}

export default HomeReducer;
