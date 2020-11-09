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

const BottomNavigator: React.FC = () => {
  return (
    <Container>
      <Link to="/dashboard">
        <FiHome />
        <p>Inicio</p>
      </Link>
      <Link to="/complaints">
        <FiNavigation2 />
        <p>Minhas Denuncias</p>
      </Link>
      <Link to="/report">
        <FiMap />
        <p>Relatar</p>
      </Link>
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
