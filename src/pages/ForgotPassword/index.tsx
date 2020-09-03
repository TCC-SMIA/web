import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import imgLogo from '../../assets/logo.png';
import api from '../../services/api';
import {
  Container,
  ImageContainer,
  LogoImage,
  FormContainer,
  BackToLogonContainer,
} from './styles';

const ForgotPassword: React.FC = () => {
  const [emailInput, setEmailInput] = useState();

  const navigate = useNavigate();

  const handleForgotPassword = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();

      const response = await api.post('/password/forgot', {
        email: emailInput,
      });

      if (response) navigate('/signin');
    },
    [emailInput, navigate],
  );

  const handleChangeEmailInput = useCallback((event) => {
    setEmailInput(event.target.value);
  }, []);

  return (
    <Container>
      <FormContainer>
        <LogoImage src={imgLogo} alt="SMIA" />
        <div>
          <p>Redefina sua senha</p>
        </div>

        <form onSubmit={(event) => handleForgotPassword(event)}>
          <div>
            <input
              placeholder="Email: "
              name="email"
              onChange={(event) => handleChangeEmailInput(event)}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
        <BackToLogonContainer>
          <Link to="/signin">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </BackToLogonContainer>
      </FormContainer>
      <ImageContainer />
    </Container>
  );
};

export default ForgotPassword;
