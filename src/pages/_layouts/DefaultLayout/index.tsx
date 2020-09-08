import React from 'react';
import { Outlet } from 'react-router';

import { Container } from './styles';
import Header from '../../../components/Header';

const DefaultLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default DefaultLayout;
