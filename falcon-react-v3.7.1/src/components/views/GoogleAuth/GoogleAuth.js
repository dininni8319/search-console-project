import { useContext, useEffect } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";

const GoogleAuth = () => {
  const [searchParams, setSearchParams ] = useSearchParams();
  let code = searchParams.get("code")

  const { api_urls } = useContext(ConfigContext);
  
  useEffect(() => {
    fetch(`${api_urls.backend}/google/auth/login`,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({auth_code: code}),
    })
     .then(response => response.json())
     .then(res => console.log(res))
     
  }, [code])
  
  return (
    <>
      <Flex alignItems="center" justifyContent="between">
        <h1 className='bg-danger fs-1'>Google Auth Page</h1>
      </Flex>
    </>
  );
};

export default GoogleAuth;
