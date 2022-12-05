import { useContext, useEffect } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";
import { AuthContext } from "context/Auth/index";
import FormSelect from 'components/UI/FormSelect';
import { useNavigate } from "react-router";

const LandingPage = () => {
 
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
       <FormSelect />
      </Flex>
    </>
  );
};

export default LandingPage;
