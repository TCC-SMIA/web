import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiHome,
  FiMap,
  FiMessageCircle,
  FiUser,
  FiNavigation2,
} from 'react-icons/fi';

import { Container } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { UserTypes } from '../../entities/User';

const BottomNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Link to="/dashboard">
        <FiHome />
        <p>Início</p>
      </Link>
      {user.type === UserTypes.Reporter && (
        <>
          <Link to="/complaints">
            <FiNavigation2 />
            <p>Denúncias</p>
          </Link>
          <Link to="/report">
            <FiMap />
            <p>Relatar</p>
          </Link>
        </>
      )}
      <Link to="/messages">
        <FiMessageCircle />
        <p>Mensagens</p>
      </Link>
      <Link to="/profile">
        <FiUser />
        <p>Perfil</p>
      </Link>
    </Container>
  );
};

export default BottomNavigator;
