import React from "react";
import { LOADING, ERROR, SUCCESS } from './actionTypes';

export const initialState = {
  isLoading: false,
  status: '',
  error: '',
  data: []
};

const apiReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
        status: LOADING
      };
    case SUCCESS:
      return {
        ...state,
        status: SUCCESS,
        isLoading: false,
        data: action.data
      };

    case ERROR:
      return {
        ...state,
        status: ERROR,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default apiReducer;
