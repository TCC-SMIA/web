import React, { useState, useCallback } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

import imgLogo from '../../assets/logo.png';
import Tooltip from '../Tooltip';
import Notification from '../Notification';

import { Container, LogoImage, Botoes, Button, Title } from './styles';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const handleNoticationVisible = useCallback(() => {
    setNotificationsVisible(!notificationsVisible);
  }, [notificationsVisible]);

  const handleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <Container>
      <Button>
        <Link to="/dashboard">
          <LogoImage src={imgLogo} alt="SMIA" />
        </Link>
      </Button>

      <Botoes>
        <Button>
          <Link to="/dashboard">
            <Title>Início</Title>
          </Link>
        </Button>

        <Button>
          <Link to="/complaints">
            <Title>Minhas Denúncias</Title>
          </Link>
        </Button>

        <Button>
          <Link to="/report">
            <Title>Relatar</Title>
          </Link>
        </Button>

        <Button>
          <Link to="/messages">
            <Title>Mensagens</Title>
          </Link>
        </Button>

        <Button onClick={handleNoticationVisible}>
          <IoMdNotificationsOutline size={30} color="#fff" />
          <Notification visible={notificationsVisible} />
        </Button>

        <Button onClick={handleVisible}>
          <FaUserCircle size={40} color="#fff" />
          <Tooltip visible={visible} />
        </Button>
      </Botoes>
    </Container>
  );
};

export default Header;
