import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatar_url: string;
}

interface Agency {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  latitude: number;
  longitude: number;
}

interface AuthState {
  user: User | Agency;
  token: string;
  user_type: number;
}

interface SignInCredentias {
  login: string;
  password: string;
}

interface AuthContextData {
  user: User | Agency;
  signIn(credentials: SignInCredentias): Promise<void>;
  signOut(): void;
  updateUser(user: User | Agency): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const tokenStoraged = localStorage.getItem('@smia:token');
    const userStoraged = localStorage.getItem('@smia:user');
    const userTypeStoraged = localStorage.getItem('@smia:user_type');

    if (tokenStoraged && userStoraged && userTypeStoraged) {
      api.defaults.headers.authorization = `Bearer ${tokenStoraged}`;
      return {
        token: tokenStoraged,
        user: JSON.parse(userStoraged),
        user_type: Number(userTypeStoraged),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ login, password }: SignInCredentias) => {
    const response = await api.post('sessions', { login, password });

    const { token, user, user_type } = response.data;

    localStorage.setItem('@smia:token', token);
    localStorage.setItem('@smia:user', JSON.stringify(user));
    localStorage.setItem('@smia:user_type', user_type);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user, user_type });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@smia:token');
    localStorage.removeItem('@smia:user');
    localStorage.removeItem('@smia:user_type');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User | Agency) => {
      setData({
        token: data.token,
        user,
        user_type: data.user_type,
      });
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [data.token, data.user_type],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
