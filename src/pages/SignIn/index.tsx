import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import imgLogo from '../../assets/logo.png';

import {
  Container,
  ImageContainer,
  FormContainer,
  NotHaveAccountContainer,
  ForgotPasswordContainer,
  LogoImage,
} from './styles';
import { useAuth } from '../../hooks/useAuth';

const SignIn: React.FC = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();

      await signIn({ login: loginInput, password: passwordInput });
    },
    [loginInput, passwordInput, signIn],
  );

  const handleChangeLoginInput = useCallback((event) => {
    setLoginInput(event.target.value);
  }, []);

  const handleChangePasswordInput = useCallback((event) => {
    setPasswordInput(event.target.value);
  }, []);

  return (
    <Container>
      <ImageContainer />
      <FormContainer>
        <LogoImage src={imgLogo} alt="SMIA" />
        <div>
          <p>Login</p>
        </div>

        <form onSubmit={(event) => handleSignIn(event)}>
          <div>
            <input
              placeholder="Login: "
              name="login"
              onChange={(event) => handleChangeLoginInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="Password: "
              name="password"
              type="password"
              onChange={(event) => handleChangePasswordInput(event)}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>

        <ForgotPasswordContainer>
          <Link to="/forgot-password">Esqueci minha senha</Link>
        </ForgotPasswordContainer>

        <NotHaveAccountContainer>
          <h1>Ainda não tem uma conta?</h1>
          <Link to="/signup">Criar conta</Link>
        </NotHaveAccountContainer>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
