import React from 'react';
import { Outlet } from 'react-router';

import Header from '../../../components/Header';
import { Container } from './styles';

const AuthLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
