import { useContext, useEffect } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";
import Starter from 'components/pages/Starter';
import style from 'App.css';

const AuthWithGoogle = () => {
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
      <Flex alignItems="center" justifyContent="center">
        <div className='d-flex justify-content-center align-items-center class-custom-height'>
          <Starter />
        </div>
      </Flex>
    </>
  );
};

export default AuthWithGoogle;
