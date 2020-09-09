import React, { useState, useCallback } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, FormContent, AvatarContainer } from './styles';
import { useAuth } from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const [nameInput, setNameInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { user, updateUser } = useAuth();

  const handleUpdateUser = useCallback((event) => {
    event.preventDefault();
    console.log('Clicou');
  }, []);

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
    setNewPassword(event.target.value);
  }, []);

  const handleChangePasswordConfirmationInput = useCallback((event) => {
    setPasswordConfirmation(event.target.value);
  }, []);

  return (
    <Container>
      <AvatarContainer>
        <img src={user.avatar_url} alt={user.name} />
      </AvatarContainer>
      <FormContent>
        <form onSubmit={(event) => handleUpdateUser(event)}>
          <Input
            placeholder="Nome: "
            name="name"
            value={user.name}
            onChange={(event) => handleChangeNameInput(event)}
          />
          <Input
            placeholder="Apelido: "
            name="nickname"
            onChange={(event) => handleChangeNicknameInput(event)}
          />
          <Input
            placeholder="Email: "
            name="email"
            value={user.email}
            onChange={(event) => handleChangeEmailInput(event)}
          />
          <Input
            placeholder="Senha Atual: "
            name="oldpassword"
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
