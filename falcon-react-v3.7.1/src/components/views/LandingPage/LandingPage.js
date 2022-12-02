import { useContext, useEffect } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";

const LandingPage = () => {
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
    <MainLayout>
      <Flex alignItems="center" justifyContent="between">
        <h3>Landing Page</h3>
      </Flex>
    </MainLayout>
  );
};

export default LandingPage;
