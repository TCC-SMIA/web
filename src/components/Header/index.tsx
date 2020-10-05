import React, { useState, useCallback } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

import imgLogo from '../../assets/logo.png';
import Tooltip from '../Tooltip';
import Notification from '../Notification';

import { Container, LogoImage, Botoes, Botao, Title } from './styles';

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
      <LogoImage src={imgLogo} alt="SMIA" />

      <Botoes>
        <Botao>
          <Link to="/dashboard">
            <Title>Início</Title>
          </Link>
        </Botao>

        <Botao>
          <Link to="/report">
            <Title>Relatar</Title>
          </Link>
        </Botao>

        <Botao>
          <Link to="/messages">
            <Title>Mensagens</Title>
          </Link>
        </Botao>

        <Botao onClick={handleNoticationVisible}>
          <IoMdNotificationsOutline size={30} color="#fff" />
          <Notification visible={notificationsVisible} />
        </Botao>

        <Botao onClick={handleVisible}>
          <FaUserCircle size={40} color="#fff" />
          <Tooltip visible={visible} />
        </Botao>
      </Botoes>
    </Container>
  );
};

export default Header;
