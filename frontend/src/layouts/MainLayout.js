import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import AppContext from 'context/Context';
import classNames from 'classnames';

const MainLayout = ({ children, data, handleChange, isOpen/* handleSubmit */ }) => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  const {
    config: { isFluid, navbarPosition }
  } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='container-fluid'>
     {!isOpen && <NavbarVertical 
          /* data={data} 
          handleChange={handleChange} */
        />}
        <div className={classNames('content', { 'pb-0': isKanban })}>
        {!isOpen &&  <NavbarTop 
          data={data} 
          handleChange={handleChange}
        />}
          {/*------ Main Routes ------*/}
          
          {children}
        </div>
       

    </div>
  );
};

export default MainLayout;
