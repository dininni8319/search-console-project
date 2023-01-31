import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';
import AuthSplitLayout from 'layouts/AuthSplitLayout';
import bgImg from 'assets/img/generic/14.jpg';
import Flex from 'components/common/Flex';
import { useTranslation } from 'react-i18next';

const Login = ({ handleGoogleLogin }) => {
  const { t } = useTranslation();
  return (
    <AuthSplitLayout bgProps={{ image: bgImg, position: '50% 20%' }}>
      <Flex alignItems="center" justifyContent="between">
        <h3>{t('login')}</h3>
        <p className="mb-0 fs--1">
          <span className="fw-semi-bold">{t('new_user')}</span>
          <Link to="/register">{t('create_account')}</Link>
        </p>
      </Flex>
      <LoginForm
        layout="split"
        hasLabel
        handleGoogleLogin={handleGoogleLogin}
      />
    </AuthSplitLayout>
  );
};

export default Login;
