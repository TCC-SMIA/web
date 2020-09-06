import React, { useState, useCallback } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Container, LogoImage, Botoes, Botao, Title } from './styles';
import imgLogo from '../../assets/logo.png';
import Tooltip from '../Tooltip';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <Container>
      <LogoImage src={imgLogo} alt="SMIA" />

      <Botoes>
        <Botao>
          <Link to="/">
            <Title>Início</Title>
          </Link>
        </Botao>

        <Botao>
          <Link to="/">
            <Title>Relatar</Title>
          </Link>
        </Botao>

        <Botao>
          <Link to="/">
            <Title>Mensagens</Title>
          </Link>
        </Botao>

        <Botao>
          <Link to="/">
            <IoMdNotificationsOutline size={30} color="#fff" />
          </Link>
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
