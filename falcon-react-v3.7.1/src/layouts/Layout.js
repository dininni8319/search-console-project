import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import is from 'is_js';
import MainLayout from './MainLayout';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import ErrorLayout from './ErrorLayout';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton } from 'components/common/Toast';
import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';
import LandingPage from "components/views/LandingPage/LandingPage";
import SplitLogin from 'components/authentication/split/Login';
import SplitLogout from 'components/authentication/split/Logout';
import SplitRegistration from 'components/authentication/split/Registration';
import SplitForgetPassword from 'components/authentication/split/ForgetPassword';
import SplitPasswordReset from 'components/authentication/split/PasswordReset';
import SplitConfirmMail from 'components/authentication/split/ConfirmMail';
import SplitLockScreen from 'components/authentication/split/LockScreen';
import AppContext from 'context/Context';
import Welcome from 'components/views/Welcome/Welcome';

const Layout = () => {

    const [ url , setUrl] = useState('')
   
    const handleGoogleLogin = async() => {
    
        try {
          const response = await(await fetch('http://localhost:8000/api/google/login/url'))  
          
          if(response) {
            const url = await response.json();
            setUrl(url);
            window.location.replace(url);
            
          }

        } catch (error) {
            console.log(error.message);
        }
    };

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  useContext(AppContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
  }, [HTMLClassList]);

  return (
    <>
      <Routes>
        {/* <Route path="landing" element={<Landing />} /> */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Welcome />} />
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
          <Route path="errors/500" element={<Error500 />} />
        </Route>
       
        <Route path="login" element={<SplitLogin handleGoogleLogin={handleGoogleLogin} />} />
  
        <Route path="logout" element={<SplitLogout handleGoogleLogin={handleGoogleLogin} />} />
        <Route
          path="register"
          element={<SplitRegistration />}
        />
        <Route
          path="authentication/split/forgot-password"
          element={<SplitForgetPassword />}
        />
        <Route
          path="authentication/split/reset-password"
          element={<SplitPasswordReset />}
        />
        <Route
          path="authentication/split/confirm-mail"
          element={<SplitConfirmMail />}
        />
        <Route
          path="authentication/split/lock-screen"
          element={<SplitLockScreen />}
        /> 

        {/* <Navigate to="/errors/404" /> */}
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Routes>
      <SettingsToggle />
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </>
  );
};

export default Layout;
