import { useState, useContext, createContext } from 'react';
import { ConfigContext } from '../Config';

export const GoogleContext = createContext();

export function GoogleProvider(props) {
  let { api_urls } = useContext(ConfigContext);

  const [url, setUrl] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(
        `${api_urls.backend}/google/login/url`
      );

      if (response) {
        const url = await response.json();
        setUrl(url);
        window.location.replace(url);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <GoogleContext.Provider value={{ handleGoogleLogin }}>
      {props.children}
    </GoogleContext.Provider>
  );
}
