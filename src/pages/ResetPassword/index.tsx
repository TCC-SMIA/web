import React, { useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import imgLogo from '../../assets/logo.png';
import Button from '../../components/Button';

import {
  Container,
  ImageContainer,
  LogoImage,
  FormContainer,
  BackToLogonContainer,
} from './styles';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const handleResetPassword = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();

      if (password !== confirmPassword) {
        throw new Error();
      }

      const token = location.search.replace('?token=', '');

      if (!token) {
        throw new Error();
      }

      const response = await api.post('/password/reset', {
        password,
        password_confirmation: confirmPassword,
        token,
      });

      if (response) navigate('/signin');
    },
    [confirmPassword, location.search, navigate, password],
  );

  const handleChangeConfirmPasswordInput = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);

  const handleChangePasswordInput = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  return (
    <Container>
      <FormContainer>
        <LogoImage src={imgLogo} alt="SMIA" />
        <div>
          <p>Redefina sua senha</p>
        </div>

        <form onSubmit={(event) => handleResetPassword(event)}>
          <div>
            <input
              placeholder="Senha: "
              name="password"
              type="password"
              onChange={(event) => handleChangePasswordInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="Confirmar Senha: "
              name="confirmPassword"
              type="password"
              onChange={(event) => handleChangeConfirmPasswordInput(event)}
            />
          </div>
          <Button type="submit">Redefinir</Button>
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

export default ResetPassword;
