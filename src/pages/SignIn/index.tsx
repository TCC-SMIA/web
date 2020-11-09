import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { FiLogIn } from 'react-icons/fi';

import { toast } from 'react-toastify';
import imgLogo from '../../assets/logo.png';
import Button from '../../components/Button';
import {
  Container,
  ImageContainer,
  FormContainer,
  NotHaveAccountContainer,
  ForgotPasswordContainer,
  LogoImage,
} from './styles';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const handleSignIn = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();
      try {
        await signIn({ login: loginInput, password: passwordInput });

        toast.success('Login realizado com sucesso');

        navigate('/dashboard');
      } catch (error) {
        toast.error('Email ou senha incorretos.');
      }
    },
    [loginInput, navigate, passwordInput, signIn],
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
          <Input
            placeholder="Email ou apelido"
            name="login"
            onChange={(event) => handleChangeLoginInput(event)}
          />
          <Input
            placeholder="Senha "
            name="password"
            type="password"
            onChange={(event) => handleChangePasswordInput(event)}
          />
          <Button type="submit">Entrar</Button>
        </form>

        <ForgotPasswordContainer>
          <Link to="/forgot-password">Esqueci minha senha</Link>
        </ForgotPasswordContainer>

        <NotHaveAccountContainer>
          <h1>Ainda não tem uma conta?</h1>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </NotHaveAccountContainer>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
