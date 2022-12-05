import { useContext, useEffect } from 'react';
import { useSearchParams  } from 'react-router-dom';
import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";
import { AuthContext } from "context/Auth/index";

const GoogleAuth = () => {

  const { api_urls } = useContext(ConfigContext);
  
  return (
    <>
     {/* pagina del dettagli delle analytics */}
      <Flex alignItems="center" justifyContent="between">
    
        <h1 className='bg-danger fs-1'>Congratulazione il tuo progetto è stato creato, Analitics Page</h1>
      </Flex>
    </>
  );
};

export default GoogleAuth;
