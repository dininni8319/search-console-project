import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Flex from 'components/common/Flex';
import { ConfigContext } from 'context/Config/index';
import { AuthContext } from 'context/Auth/index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { api_urls } = useContext(ConfigContext);
  const [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams.get('code');

  useEffect(() => {
    fetch(`${api_urls.backend}/google/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth_code: code })
    })
      .then(response => response.json())
      .then(res => {
        if (res.success && res.token) {
          login(res.user_data.email, res.token, res.user_data.id);

          navigate('/landing_page');
        } else {
          navigate('/login');
        }
      });
  }, [code]);

  return (
    <>
      {/* questa pagina serve solo per prenderci il code da google */}
      <Flex alignItems="center" justifyContent="center"></Flex>
    </>
  );
};

export default LandingPage;
