import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import imgLogo from '../../assets/logo.png';
import api from '../../services/api';
import Button from '../../components/Button';

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
      setLoading(true);

      const response = await api.post('/password/forgot', {
        email: emailInput,
      });

      setLoading(false);
      if (response) navigate('/signin');
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
          <div>
            <input
              placeholder="Email: "
              name="email"
              onChange={(event) => handleChangeEmailInput(event)}
            />
          </div>
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
