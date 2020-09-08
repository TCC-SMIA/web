import React from 'react';
import { Outlet } from 'react-router';

import { Container } from './styles';

const DefaultLayout: React.FC = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default DefaultLayout;
