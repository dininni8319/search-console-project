import React from 'react';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import RegistrationForm from 'components/authentication/RegistrationForm';
import bgImg from 'assets/img/generic/15.jpg';
import AuthSplitLayout from 'layouts/AuthSplitLayout';
import { useTranslation } from 'react-i18next';

const Registration = ({ handleGoogleLogin }) => {
  const { t } = useTranslation();
  return (
    <AuthSplitLayout bgProps={{ image: bgImg }}>
      <Flex alignItems="center" justifyContent="between">
        <h3>{t('register')}</h3>
        <p className="mb-0 fs--1">
          <span className="fw-semi-bold px-1">{t('already_user')}</span>
          <Link to="/login">{t('login')}</Link>
        </p>
      </Flex>
      <RegistrationForm
        layout="split"
        hasLabel
        handleGoogleLogin={handleGoogleLogin}
      />
    </AuthSplitLayout>
  );
};

export default Registration;
