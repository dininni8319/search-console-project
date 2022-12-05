import { useCallback } from "react";
import { LOADING, SUCCESS, ERROR } from './actionTypes';

const useApiRequest = (handleDispatch) => {
  
  const makeRequest = useCallback(async (endpoint, params = {}) => {
    handleDispatch({ type: LOADING });

    try {
      const response = await (await fetch(endpoint, params))
    
      const { sites } = await response.json()
  
      let sitesToArray = Object.values(sites)
      
      console.log(sites, 'testing the sites');
      handleDispatch({ type: SUCCESS, data: sitesToArray })
    
    } catch (error) {
      handleDispatch({ type: ERROR, error })
    }
  },[])

  return { makeRequest }
};

export default useApiRequest;