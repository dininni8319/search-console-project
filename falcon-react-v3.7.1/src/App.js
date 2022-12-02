import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './layouts/Layout';
import { AuthProvider } from "context/Auth/index";
import { ConfigProvider } from "context/Config/index";
import { GoogleProvider } from "context/Google/index";

const App = () => {
  return (
    <ConfigProvider> 
     <AuthProvider>
      <GoogleProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Layout />
        </Router>
      </GoogleProvider>
     </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
