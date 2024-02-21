const initialState = {
  toggle: false,
};

function HomeReducer(state = initialState, action) {
  console.log({ action });
  switch (action.type) {
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
