import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  ImageContainer,
  FormContainer,
  NotHaveAccountContainer,
} from './styles';
import api from '../../services/api';

const SignIn: React.FC = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSignIn = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();

      await api.post('/sessions', {
        login: loginInput,
        password: passwordInput,
      });
    },
    [loginInput, passwordInput],
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
              onChange={(event) => handleChangePasswordInput(event)}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>

        <NotHaveAccountContainer>
          <h1>Ainda não tem uma conta?</h1>
          <Link to="/signup">Criar conta</Link>
        </NotHaveAccountContainer>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
