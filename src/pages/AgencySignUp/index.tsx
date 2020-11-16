import React, { useState, useCallback, useEffect } from 'react';
import { FiArrowLeft, FiUser, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';
import imgLogo from '../../assets/logo.png';
import Button from '../../components/Button';

import {
  Container,
  ImageContainer,
  FormContainer,
  LogoImage,
  BottomButtonsContainer,
  MapButton,
} from './styles';
import Input from '../../components/Input';
import ModalMap from '../../components/ModalMap';

interface ISignUpAgencyRequest {
  name: string;
  cnpj: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}

const AgencySignUp: React.FC = () => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailConfirmationInput, setEmailConfirmationInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [cnpjInput, setCnpjInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalMapToggle, setModalMapToggle] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigate = useNavigate();

  const handleSignUp = useCallback(
    async (event): Promise<void> => {
      event.preventDefault();
      setLoading(true);
      try {
        const [latitude, longitude] = selectedPosition;

        const userSchema = Yup.object().shape({
          name: Yup.string()
            .required('Nome é um campo obrigatório.')
            .matches(
              /\b[A-Za-z](?!\s)/,
              'Insira um nome válido e sem caracteres especiais.',
            ),
          cnpj: Yup.string()
            .required('CNPJ é um campo obrigatório.')
            .matches(
              /([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/,
              'Insira um CNPJ válido.',
            ),
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
            cnpj: cnpjInput,
            email: emailInput,
            email_confirmation: emailConfirmationInput,
            password: passwordInput,
          },
          { abortEarly: false },
        );

        await api.post('/agencies', {
          name: nameInput,
          cnpj: cnpjInput,
          email: emailInput,
          password: passwordInput,
          latitude,
          longitude,
        } as ISignUpAgencyRequest);

        toast.success('Cadastro realizado com sucesso.');
        setLoading(false);
        navigate('/signin');
      } catch (error) {
        setLoading(false);
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
      selectedPosition,
      nameInput,
      cnpjInput,
      emailInput,
      emailConfirmationInput,
      passwordInput,
      navigate,
    ],
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleChangeEmailInput = useCallback((event) => {
    setEmailInput(event.target.value);
  }, []);

  const handleChangeEmailConfirmationInput = useCallback((event) => {
    setEmailConfirmationInput(event.target.value);
  }, []);

  const handleChangeNameInput = useCallback((event) => {
    setNameInput(event.target.value);
  }, []);

  const handleChangeCnpjInput = useCallback((event) => {
    setCnpjInput(event.target.value);
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
          <p>Cadastro</p>
        </div>

        <form onSubmit={(event) => handleSignUp(event)}>
          <Input
            placeholder="Nome: "
            name="name"
            onChange={(event) => handleChangeNameInput(event)}
          />
          <Input
            placeholder="CNPJ: "
            name="cnpj"
            type="number"
            pattern="[0-9]"
            onChange={(event) => handleChangeCnpjInput(event)}
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
          <MapButton type="button" onClick={() => setModalMapToggle(true)}>
            <FiMapPin />
            Marcar no mapa
          </MapButton>
          <Button loading={loading} type="submit">
            Cadastrar
          </Button>
        </form>
        <BottomButtonsContainer>
          <Link to="/signup">
            <FiUser />
            Cadastrar como pessoa
          </Link>
          <Link to="/signin">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </BottomButtonsContainer>
      </FormContainer>

      {modalMapToggle && (
        <ModalMap
          initialPosition={initialPosition}
          selectedPosition={selectedPosition}
          handleMapClick={handleMapClick}
          onClose={() => setModalMapToggle(false)}
        />
      )}
    </Container>
  );
};

export default AgencySignUp;
