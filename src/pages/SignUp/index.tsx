import React, { useState, useCallback } from 'react';

import { useNavigate } from 'react-router';
import { Container, ImageContainer, FormContainer } from './styles';
import api from '../../services/api';

interface ISignUpRequest {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [emailConfirmationInput, setEmailConfirmationInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const navigate = useNavigate();

  const handleSignUp = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();
      console.log('signup');
      const response = await api.post('/users', {
        name: nameInput,
        nickname: nicknameInput,
        email: emailInput,
        password: passwordInput,
      } as ISignUpRequest);

      if (response) navigate('/signin');
    },
    [emailInput, passwordInput, nameInput, nicknameInput, navigate],
  );

  const handleChangeEmailInput = useCallback((event) => {
    setEmailInput(event.target.value);
  }, []);

  const handleChangePasswordInput = useCallback((event) => {
    setPasswordInput(event.target.value);
  }, []);

  const handleChangeNameInput = useCallback((event) => {
    setNameInput(event.target.value);
  }, []);

  const handleChangeNicknameInput = useCallback((event) => {
    setNicknameInput(event.target.value);
  }, []);

  const handleChangeEmailConfirmationInput = useCallback((event) => {
    setEmailConfirmationInput(event.target.value);
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
              name="name"
              onChange={(event) => handleChangeNameInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="Apelido: "
              name="nickname"
              onChange={(event) => handleChangeNicknameInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="E-mail: "
              name="email"
              onChange={(event) => handleChangeEmailInput(event)}
            />
          </div>
          <div>
            <input
              placeholder="Confirme e-mail: "
              name="emailConfirmation"
              onChange={(event) => handleChangeEmailConfirmationInput(event)}
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
