import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import imgLogo from '../../assets/logo.png';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  ImageContainer,
  LogoImage,
  FormContainer,
  BackToLogonContainer,
} from './styles';

const ForgotPassword: React.FC = () => {
  const [emailInput, setEmailInput] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();
      try {
        setLoading(true);

        const emailSchema = Yup.object().shape({
          email: Yup.string()
            .email('Insira um e-mail válido.')
            .required('E-mail é um campo obrigatório.'),
        });

        await emailSchema.validate(
          {
            email: emailInput,
          },
          { abortEarly: false },
        );

        await api.post('/password/forgot', {
          email: emailInput,
        });

        toast.success(
          `Um email para redefinição de senha foi enviado para ${emailInput}`,
        );

        setLoading(false);
        navigate('/signin');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          toast.error(error.inner[0].message);
          setLoading(false);
          return;
        }
        if (error.response.data.message === 'User does not exists.') {
          toast.error('Email não cadastrado no SMIA.');
          setLoading(false);
          return;
        }
        setLoading(false);
        toast.error('Não foi possível enviar email para redefinição de senha.');
      }
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
          <p>Email para redefinir</p>
        </div>

        <form onSubmit={(event) => handleForgotPassword(event)}>
          <Input
            placeholder="Email: "
            name="email"
            onChange={(event) => handleChangeEmailInput(event)}
          />

          <Button loading={loading} type="submit">
            Enviar
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

export default ForgotPassword;
