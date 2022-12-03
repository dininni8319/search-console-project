import { useContext, useEffect } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";
import { AuthContext } from "context/Auth/index";
import FormSelect from 'components/UI/FormSelect';
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { api_urls } = useContext(ConfigContext);
  const [searchParams, setSearchParams ] = useSearchParams();

  let code = searchParams.get("code")

  useEffect(() => {
    fetch(`${api_urls.backend}/google/auth/login`,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({auth_code: code}),
    })
     .then(response => response.json())
     .then(res => {
      if (res.success === true) {
        login(res.user_data.email, res.token, res.user_data.id);
        navigate('/home');

      } else {
        navigate('/login');
      }
    })   
  }, [code])
  
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
       <FormSelect />
      </Flex>
    </>
  );
};

export default LandingPage;
