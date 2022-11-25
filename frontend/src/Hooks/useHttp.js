import { useState, useCallback } from 'react';

const useHttp = ( applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const sendRequest = useCallback(async(requestConfig) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      )

      if (!response) {
        throw new Error("Request failed")
      }

      const data = await response.json();

      applyData(data)
    } catch (err) {
       let result = (err).message;
      setError(result || 'The request waas not successfull!')
    }
    setIsLoading(false);
  },[applyData])

  return {
    isLoading,
    error,
    sendRequest
  }
}

export default useHttp;