import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import BottomNavigator from '../../../components/BottomNavigator';

import Header from '../../../components/Header';
import { useAuth } from '../../../hooks/useAuth';
import socket from '../../../services/socket/socket';
import { Container } from './styles';

const AuthLayout: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    socket.disconnect();
    socket.connect(user.id);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user]);

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
