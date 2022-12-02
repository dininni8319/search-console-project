import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../UI/LoginForm';
import AuthSplitLayout from '../../../layouts/AuthSplitLayout';

import bgImg from '../../../assets/imgs/generics/14.jpg';
import Flex from '../../../common/Flex';

const Login = () => {
  return (
    <AuthSplitLayout bgProps={{ image: bgImg, position: '50% 20%' }}>
      <Flex alignItems="center" justifyContent="between">
        <h3>Login</h3>
        <p className="mb-0 fs--1">
          <span className="fw-semi-bold">New User? </span>
          <Link to="/authentication/split/register">Create account</Link>
        </p>
      </Flex>
      <LoginForm layout="split" hasLabel />
    </AuthSplitLayout>
  );
};

export default Login;