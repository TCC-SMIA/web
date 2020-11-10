import React, { useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleResetPassword = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();
      setLoading(true);
      try {
        const passwordSchema = Yup.object().shape({
          password: Yup.string()
            .min(6, 'Senha deve possuir no mínimo 6 caracteres.')
            .required('Senha obrigatória'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação de senha incorreta.',
          ),
        });

        await passwordSchema.validate(
          {
            password,
            confirmPassword,
          },
          { abortEarly: false },
        );

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation: confirmPassword,
          token,
        });
        setLoading(false);
        navigate('/signin');
      } catch (error) {
        setLoading(false);
        if (error instanceof Yup.ValidationError) {
          toast.error(error.inner[0].message);
          return;
        }
        toast.error('Ocorreu um erro ao resetar senha do usuário.');
      }
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
          <Button loading={loading} type="submit">
            Redefinir
          </Button>
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
