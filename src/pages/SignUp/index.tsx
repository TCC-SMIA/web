import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  ImageContainer,
  FormContainer,
  NotHaveAccountContainer,
} from './styles';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSignUp = useCallback(
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
          <p>Cadastro</p>
        </div>

        <form onSubmit={(event) => handleSignUp(event)}>
          <div>
            <input
              placeholder="Nome: "
              name="login"
              onChange={(event) => handleChangeLoginInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="E-mail: "
              name="email"
              onChange={(event) => handleChangePasswordInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="Confirme e-mail: "
              name="emailConfirmation"
              onChange={(event) => handleChangePasswordInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="Senha: "
              name="password"
              onChange={(event) => handleChangePasswordInput(event)}
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
