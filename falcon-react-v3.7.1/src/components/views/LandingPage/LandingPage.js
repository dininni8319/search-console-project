import { useContext } from 'react';
import Flex from 'components/common/Flex';
import FormSelect from 'components/UI/FormSelect';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import AppContext from 'context/Context';
import NavbarTop from 'components/navbar/top/NavbarTop';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';

const LandingPage = () => {
 
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  const {
    config: { isFluid, navbarPosition }
  } = useContext(AppContext);

  return (
    <MainLayout>
     
        <FormSelect />
    </MainLayout>
  );
};

export default LandingPage;
