import actionTypes from "../actions/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        hasFailed: false,
        isLoading: true
      };
    case actionTypes.ADD_REQUEST:
      return {
        ...state,
        hasFailed: false,
        isLoading: false,
        data: [...state.data, action.newRequest]
      };
    case actionTypes.CLOSE_REQUEST:
      const reqIndex = state.data.map(el => el.id).indexOf(action.reqId);
      //const newData = state.slice(reqIndex, 0);
      state.data[reqIndex].status = "close";
      return {
        ...state,
        hasFailed: false,
        isLoading: false,
        data: state.data
      };
    case actionTypes.SET_FAILED:
      return {
        ...state,
        hasFailed: true,
        isLoading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};
