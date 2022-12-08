import React from 'react';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import Navbar from 'components/navbar/top/Navbar';
import Background from 'components/common/Background';
import welcomeImg from '../../../assets/img/4445.jpeg';

const Welcome = () => {
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <div className='w-100'>
          <Navbar />

        </div>
      </Flex>
      <Flex alignItems="center" justifyContent="center" className='mt-5 pt-5'>
  
        <img src={welcomeImg} width='40%' height='40%'/>
      
      </Flex>
    </>
  );
};

export default Welcome;
