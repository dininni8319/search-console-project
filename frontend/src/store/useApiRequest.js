import { useCallback } from 'react';
import { LOADING, SUCCESS, ERROR } from './actionTypes';

const useApiRequest = (handleDispatch) => {
  const makeRequest = useCallback(async (endpoint, params = {}) => {
    handleDispatch({ type: LOADING });

    try {
      const response = await fetch(endpoint, params);

      const { data } = await response.json();

      let sitesToArray = Object.values(data);

      handleDispatch({ type: SUCCESS, data: sitesToArray });
    } catch (error) {
      handleDispatch({ type: ERROR, error });
    }
  }, []);

  return { makeRequest };
};

export default useApiRequest;
