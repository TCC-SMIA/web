import React, { useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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
      try {
        const userSchema = Yup.object().shape({
          name: Yup.string()
            .required('Nome é um campo obrigatório.')
            .matches(
              /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/,
              'Insira um nome válido e sem caracteres especiais.',
            ),
          nickname: Yup.string()
            .matches(
              /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
              'Insira um apelido válido e sem caracteres especiais.',
            )
            .required('Apelido é um campo obrigatório.'),
          email: Yup.string()
            .email('Insira um e-mail válido.')
            .required('E-mail é um campo obrigatório.'),
          email_confirmation: Yup.string()
            .email('Insira um email válido.')
            .oneOf([Yup.ref('email')], 'Confirmação de email incorreta.'),
          password: Yup.string()
            .min(6, 'Senha deve possuir no mínimo 6 caracteres.')
            .required('Senha é obrigatória.'),
        });

        await userSchema.validate(
          {
            name: nameInput,
            nickname: nicknameInput,
            email: emailInput,
            email_confirmation: emailConfirmationInput,
            password: passwordInput,
          },
          { abortEarly: false },
        );

        await api.post('/users', {
          name: nameInput,
          nickname: nicknameInput,
          email: emailInput,
          password: passwordInput,
        } as ISignUpRequest);

        toast.success('Cadastro realizado com sucesso.');
        navigate('/signin');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          toast.error(error.inner[0].message);
          return;
        }
        if (error.response.data.message === 'Email already exists') {
          toast.error('Email já cadastrado no SMIA.');
          return;
        }
        if (error.response.data.message === 'Nickname already used') {
          toast.error('Apelido já está em uso no SMIA.');
          return;
        }
        toast.error('Ocorreu um erro ao cadastrar usuário.');
      }
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
