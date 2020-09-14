import React, { useState, useCallback, ChangeEvent } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoIosCamera } from 'react-icons/io';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

import { Container, FormContent, AvatarContainer } from './styles';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [nameInput, setNameInput] = useState(user.name);
  const [nicknameInput, setNicknameInput] = useState(user.nickname);
  const [emailInput, setEmailInput] = useState(user.email);
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState(
    '',
  );

  const handleUpdateUser = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        if (user.user_type === 1) {
          const userSchema = Yup.object().shape({
            name: Yup.string()
              .required('Nome é um campo obrigatório.')
              .matches(
                /\b[A-Za-z](?!\s)/,
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
            old_password: Yup.string(),
            password: Yup.string().when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo senha obrigatório'),
              otherwise: Yup.string(),
            }),
            password_confirmation: Yup.string()
              .when('old_password', {
                is: (val) => !!val.length,
                then: Yup.string().required(
                  'Campo confirmar senha obrigatório',
                ),
                otherwise: Yup.string(),
              })
              .oneOf([Yup.ref('password')], 'Confirmação de senha incorreta'),
          });

          await userSchema.validate(
            {
              name: nameInput,
              nickname: nicknameInput,
              email: emailInput,
              old_password: oldPasswordInput,
              password: newPasswordInput,
              password_confirmation: passwordConfirmationInput,
            },
            { abortEarly: false },
          );

          if (oldPasswordInput === '') {
            const response = await api.put('/users/profile', {
              name: nameInput,
              nickname: nicknameInput,
              email: emailInput,
            });

            updateUser(response.data);

            toast.success('Perfil atualizado.');

            return;
          }

          const response = await api.put('/users/profile', {
            name: nameInput,
            nickname: nicknameInput,
            email: emailInput,
            oldpassword: oldPasswordInput,
            password: newPasswordInput,
            password_confirmation: passwordConfirmationInput,
          });

          updateUser(response.data);

          toast.success('Perfil atualizado.');
        }

        if (user.user_type === 2) {
          const agencySchema = Yup.object().shape({
            name: Yup.string()
              .required('Nome é um campo obrigatório.')
              .matches(
                /\b[A-Za-z](?!\s)/,
                'Insira um nome válido e sem caracteres especiais.',
              ),
            email: Yup.string()
              .email('Insira um e-mail válido.')
              .required('E-mail é um campo obrigatório.'),
            old_password: Yup.string(),
            password: Yup.string().when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo senha obrigatório'),
              otherwise: Yup.string(),
            }),
            password_confirmation: Yup.string()
              .when('old_password', {
                is: (val) => !!val.length,
                then: Yup.string().required(
                  'Campo confirmar senha obrigatório',
                ),
                otherwise: Yup.string(),
              })
              .oneOf([Yup.ref('password')], 'Confirmação de senha incorreta'),
          });

          await agencySchema.validate(
            {
              name: nameInput,
              email: emailInput,
              old_password: oldPasswordInput,
              password: newPasswordInput,
              password_confirmation: passwordConfirmationInput,
            },
            { abortEarly: false },
          );

          if (oldPasswordInput === '') {
            const response = await api.put('/agencies/profile', {
              name: nameInput,
              email: emailInput,
            });

            updateUser(response.data);

            toast.success('Perfil atualizado.');

            return;
          }

          const response = await api.put('/agencies/profile', {
            name: nameInput,
            email: emailInput,
            oldpassword: oldPasswordInput,
            password: newPasswordInput,
            password_confirmation: passwordConfirmationInput,
          });

          updateUser(response.data);

          toast.success('Perfil atualizado.');
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          toast.error(error.inner[0].message);
          return;
        }
        if (error.response.data.message === 'Email already used') {
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
      nameInput,
      newPasswordInput,
      nicknameInput,
      oldPasswordInput,
      passwordConfirmationInput,
      updateUser,
      user.user_type,
    ],
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          const newUser = {
            ...response.data.user,
            user_type: response.data.user_type,
          };

          updateUser(newUser);

          toast.success('Avatar atualizado com sucesso.');
        });
      }
    },
    [updateUser],
  );

  const handleChangeEmailInput = useCallback((event) => {
    setEmailInput(event.target.value);
  }, []);

  const handleChangeOldPasswordInput = useCallback((event) => {
    setOldPasswordInput(event.target.value);
  }, []);

  const handleChangeNameInput = useCallback((event) => {
    setNameInput(event.target.value);
  }, []);

  const handleChangeNicknameInput = useCallback((event) => {
    setNicknameInput(event.target.value);
  }, []);

  const handleChangeNewPasswordInput = useCallback((event) => {
    setNewPasswordInput(event.target.value);
  }, []);

  const handleChangePasswordConfirmationInput = useCallback((event) => {
    setPasswordConfirmationInput(event.target.value);
  }, []);

  return (
    <Container>
      <AvatarContainer>
        <img
          src={
            user.avatar_url ||
            'https://api.adorable.io/avatars/285/abott@adorable.png'
          }
          alt={user.name}
        />
        <label htmlFor="avatar">
          <IoIosCamera />
          <input
            type="file"
            name=""
            id="avatar"
            onChange={handleAvatarChange}
          />
        </label>
      </AvatarContainer>
      <FormContent>
        <form onSubmit={(event) => handleUpdateUser(event)}>
          <Input
            placeholder="Nome: "
            name="name"
            value={user.name}
            onChange={(event) => handleChangeNameInput(event)}
          />
          {user.user_type === 1 && (
            <Input
              placeholder="Apelido: "
              name="nickname"
              value={user.nickname}
              onChange={(event) => handleChangeNicknameInput(event)}
            />
          )}
          <Input
            placeholder="Email: "
            name="email"
            value={user.email}
            onChange={(event) => handleChangeEmailInput(event)}
          />
          <Input
            placeholder="Senha Atual: "
            name="oldPassword"
            onChange={(event) => handleChangeOldPasswordInput(event)}
          />
          <Input
            placeholder="Nova Senha: "
            name="newPassword"
            onChange={(event) => handleChangeNewPasswordInput(event)}
          />
          <Input
            placeholder="Confirmar Senha: "
            name="passwordConfirmation"
            onChange={(event) => handleChangePasswordConfirmationInput(event)}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </FormContent>
    </Container>
  );
};

export default Profile;
