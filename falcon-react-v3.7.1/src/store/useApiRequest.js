import { useCallback, useReducer } from "react";
import { LOADING, SUCCESS, ERROR } from './actionTypes';
import authReducer, { initialState } from './apiReducer'

const useApiRequest = (endpoint, params = {}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const makeRequest = useCallback(async () => {
    dispatch({ type: LOADING });

    try {
      const response = await (await fetch(endpoint, params))
    
      const { sites } = await response.json()
  
      dispatch({ type: SUCCESS, data: sites })

    } catch (error) {
      dispatch({type: ERROR, error})
    }

  },[endpoint, params])

  return {state, makeRequest}
};

export default useApiRequest;