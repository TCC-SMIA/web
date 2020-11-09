import React from 'react';
import { Link } from 'react-router-dom';

import imgLogo from '../../assets/logo-white.png';
import treesSvg from '../../assets/trees.svg';

import {
  Container,
  InfoContainer,
  InitialContent,
  Header,
  ButtonContainer,
} from './styles';

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Header>
        <img src={imgLogo} alt="SMIA" />
        <Link to="signin">Entrar</Link>
      </Header>
      <InitialContent>
        <InfoContainer>
          <h1>SMIA</h1>
          <h3>Sistema de mapeamento de irregularidades ambientais.</h3>
          <p>
            Esse sistema foi desenvolvido visando facilitar a participação da
            sociedade na preservação do meio ambiente.
          </p>
          <p>
            Desenvolvido por Gabriel Portugal, Higor Martins, Raphael Melo e
            Renan Horste.
          </p>
        </InfoContainer>
        <ButtonContainer>
          <img src={treesSvg} alt="Árvores" />
          <Link to="signup">Cadastre-se</Link>
        </ButtonContainer>
      </InitialContent>
    </Container>
  );
};

export default LandingPage;
