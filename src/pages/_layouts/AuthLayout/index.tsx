import React from 'react';
import { Outlet } from 'react-router';
import BottomNavigator from '../../../components/BottomNavigator';

import Header from '../../../components/Header';
import { Container } from './styles';

const AuthLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <BottomNavigator />
    </>
  );
};

export default AuthLayout;
