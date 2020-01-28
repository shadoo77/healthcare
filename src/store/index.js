import React, { createContext, useReducer } from "react";
import rootReducers from "./reducers/root";

const RootContext = createContext();

const healthRequests = [
  {
    id: "0",
    fullName: "Joe",
    title: "hwwwewejj ",
    start: "02/07/2020",
    end: "02/09/2020",
    extraInfo: "anything",
    status: "open"
  },
  {
    id: "1",
    fullName: "Noone",
    title: "anything ",
    start: "02/07/2020",
    end: "02/09/2020",
    extraInfo: "dfhjkh fkjgkfjgh",
    status: "close"
  }
];

const initialRequestsState = {
  hasFailed: false,
  isLoading: false,
  data: healthRequests,
  errorMessage: ""
};

const initState = {
  requests: initialRequestsState
};

const RootContextProvider = props => {
  const [state, dispatch] = useReducer(rootReducers, initState);
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RootContext.Provider>
  );
};

export { RootContext, RootContextProvider };
