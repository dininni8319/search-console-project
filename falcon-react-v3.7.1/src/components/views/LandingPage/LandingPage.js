import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Flex from 'components/common/Flex';

const LandingPage = () => {
  return (
    <MainLayout>
      <Flex alignItems="center" justifyContent="between">
        <h3>Landing Page</h3>
      </Flex>
    </MainLayout>
  );
};

export default LandingPage;
