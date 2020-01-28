import actionTypes from "./actionTypes";

export const setLoading = () => {
  return {
    type: actionTypes.SET_LOADING
  };
};

export const setFailed = err => {
  return {
    type: actionTypes.SET_FAILED,
    error: err
  };
};

export const addNewRequest = async (
  dispatch,
  newRequest,
  history,
  successConfirm
) => {
  dispatch(setLoading());
  try {
    dispatch({
      type: actionTypes.ADD_REQUEST,
      newRequest
    });
    successConfirm("success");
    setTimeout(() => {
      history.push(`/`);
    }, 3000);
  } catch (err) {
    dispatch(setFailed(err));
  }
};

export const closeRequest = async (
  dispatch,
  reqId,
  history,
  successConfirm
) => {
  dispatch(setLoading());
  try {
    dispatch({
      type: actionTypes.CLOSE_REQUEST,
      reqId
    });
    successConfirm("success");
    setTimeout(() => {
      history.push(`/`);
    }, 3000);
  } catch (err) {
    dispatch(setFailed(err));
  }
};
