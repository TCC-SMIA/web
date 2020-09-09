import React, { useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import imgLogo from '../../assets/logo.png';
import Button from '../../components/Button';

import {
  Container,
  ImageContainer,
  FormContainer,
  LogoImage,
  BackToLogonContainer,
} from './styles';
import Input from '../../components/Input';

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

      if (
        nameInput === '' ||
        nicknameInput === '' ||
        emailInput === '' ||
        emailConfirmationInput === '' ||
        passwordInput === ''
      ) {
        toast.error('Preencha todos os campos ');
        return;
      }

      if (emailInput !== emailConfirmationInput) {
        toast.error('Emails não conferem.');
        return;
      }

      const response = await api.post('/users', {
        name: nameInput,
        nickname: nicknameInput,
        email: emailInput,
        password: passwordInput,
      } as ISignUpRequest);

      navigate('/signin');
    },
    [
      emailInput,
      emailConfirmationInput,
      nameInput,
      nicknameInput,
      passwordInput,
      navigate,
    ],
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
        <LogoImage src={imgLogo} alt="SMIA" />
        <div>
          <p>Cadastro</p>
        </div>

        <form onSubmit={(event) => handleSignUp(event)}>
          <Input
            placeholder="Nome: "
            name="name"
            onChange={(event) => handleChangeNameInput(event)}
          />
          <Input
            placeholder="Apelido: "
            name="nickname"
            onChange={(event) => handleChangeNicknameInput(event)}
          />
          <Input
            placeholder="E-mail: "
            name="email"
            onChange={(event) => handleChangeEmailInput(event)}
          />
          <Input
            placeholder="Confirme e-mail: "
            name="emailConfirmation"
            onChange={(event) => handleChangeEmailConfirmationInput(event)}
          />
          <Input
            placeholder="Senha: "
            name="password"
            type="password"
            onChange={(event) => handleChangePasswordInput(event)}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <BackToLogonContainer>
          <Link to="/signin">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </BackToLogonContainer>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
