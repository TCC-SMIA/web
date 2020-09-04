import React from 'react';
import imgLogo from '../../assets/logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';

import {
  Container,
  LogoImage,
  Botoes,
  Botao,
  Title,
} from './styles';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Container>
      <LogoImage src={imgLogo} alt="SMIA" />

      <Botoes>
        <Botao>
          <Link to='/'>
            <Title>Início</Title>
          </Link>
        </Botao>

        <Botao>
          <Link to='/'>
            <Title>Relatar</Title>
          </Link>
        </Botao>

        <Botao>

          <Link to='/'>
            <Title>Mensagens</Title>
          </Link>
        </Botao>

        <Botao>
          <Link to='/'>
            <IoMdNotificationsOutline size={30} color='#fff' />
          </Link>
        </Botao>

        <Botao>
          <Link to='/'>
            <FaUserCircle size={40} color='#fff' />
          </Link>
        </Botao>

      </Botoes>

    </Container>
  )
};

export default Header;
