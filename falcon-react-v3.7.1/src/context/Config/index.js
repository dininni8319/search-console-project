import { createContext } from "react";

export const ConfigContext = createContext();

export function ConfigProvider(props) {
  const api_urls = {
    backend: process.env.REACT_APP_API_URL,
  };

  return (
    <ConfigContext.Provider value={{ api_urls }}>
      {props.children}
    </ConfigContext.Provider>
  );
}
