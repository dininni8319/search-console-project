import { createContext } from 'react';

export const ConfigContext = createContext();

export function ConfigProvider(props) {
  const { 
    REACT_APP_API_URL,
    REACT_APP_PROD,
    NODE_ENV
  } = process.env

  const api_urls = {
    backend: 
      NODE_ENV === 'development' ?
        REACT_APP_API_URL :
        REACT_APP_PROD
  };


  return (
    <ConfigContext.Provider value={{ api_urls }}>
      {props.children}
    </ConfigContext.Provider>
  );
}
