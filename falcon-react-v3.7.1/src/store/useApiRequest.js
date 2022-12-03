import { useCallback } from "react";
import { LOADING, SUCCESS, ERROR } from './actionTypes';

const useApiRequest = (handleDispatch) => {
  
  const makeRequest = useCallback(async (endpoint, params = {}) => {
    handleDispatch({ type: LOADING });

    try {
      const response = await (await fetch(endpoint, params))
    
      const { sites } = await response.json()
  
      handleDispatch({ type: SUCCESS, data: sites })

    } catch (error) {
      handleDispatch({ type: ERROR, error })
    }

  },[])

  return { makeRequest }
};

export default useApiRequest;