import React from 'react';
import ForgetPasswordForm from 'components/authentication/ForgetPasswordForm';
import bgImg from 'assets/img/generic/17.jpg';
import AuthSplitLayout from 'layouts/AuthSplitLayout';
import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {
  const { t } = useTranslation();

  return (
    <AuthSplitLayout
      bgProps={{ image: bgImg, position: '50% 76%', overlay: true }}
    >
      <div className="text-center">
        
        <h4 className="mb-0"> {t('forgot_password')}</h4>
        <small>{t('enter_email')}</small>
        <ForgetPasswordForm 
          layout="split"
          t={t}
        />
      </div>
    </AuthSplitLayout>
  );
};

export default ForgetPassword;
