import React, { useState, useCallback } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FiHome, FiMap, FiMessageCircle, FiNavigation2 } from 'react-icons/fi';

import imgLogo from '../../assets/logo.png';
import Tooltip from '../Tooltip';
import Notification from '../Notification';

import { Container, LogoImage, Botoes, Button, Title } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { RANDOM_AVATAR } from '../../utils/constants';
import { UserTypes } from '../../entities/User';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const { user } = useAuth();

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
            <FiHome />
            <Title>Início</Title>
          </Link>
        </Button>

        {user.user_type === UserTypes.Reporter && (
          <>
            <Button>
              <Link to="/complaints">
                <FiNavigation2 />
                <Title>Minhas Denúncias</Title>
              </Link>
            </Button>

            <Button>
              <Link to="/report">
                <FiMap />
                <Title>Relatar</Title>
              </Link>
            </Button>
          </>
        )}

        <Button>
          <Link to="/messages">
            <FiMessageCircle />
            <Title>Mensagens</Title>
          </Link>
        </Button>

        <Button onClick={handleNoticationVisible}>
          <div>
            <IoMdNotificationsOutline size={30} color="#fff" />
            <Title>Notificaçes</Title>
          </div>
          <Notification visible={notificationsVisible} />
        </Button>

        <Button onClick={handleVisible}>
          <img src={user.avatar_url || RANDOM_AVATAR} alt="avatar" />
          <Tooltip visible={visible} />
        </Button>
      </Botoes>
    </Container>
  );
};

export default Header;
