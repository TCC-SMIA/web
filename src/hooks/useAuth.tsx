import React, { createContext, useCallback, useState, useContext } from 'react';
import socket from '../services/socket/socket';

import api from '../services/api';
import IUser from '../entities/User';
import IAgency from '../entities/Agency';

interface AuthState {
  user: IUser | IAgency;
  token: string;
}

interface SignInCredentias {
  login: string;
  password: string;
}

interface AuthContextData {
  user: IUser | IAgency;
  signIn(credentials: SignInCredentias): Promise<void>;
  signOut(): void;
  updateUser(user: IUser | IAgency): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const tokenStoraged = localStorage.getItem('@smia:token');
    const userStoraged = localStorage.getItem('@smia:user');

    if (tokenStoraged && userStoraged) {
      api.defaults.headers.authorization = `Bearer ${tokenStoraged}`;
      return {
        token: tokenStoraged,
        user: JSON.parse(userStoraged),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ login, password }: SignInCredentias) => {
    const response = await api.post('sessions', { login, password });

    const { token, user, user_type } = response.data;

    user.user_type = user_type;

    localStorage.setItem('@smia:token', token);
    localStorage.setItem('@smia:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });

    socket.disconnect();
    socket.connect(user.id);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@smia:token');
    localStorage.removeItem('@smia:user');
    localStorage.removeItem('@smia:user_type');

    setData({} as AuthState);
    socket.disconnect();
  }, []);

  const updateUser = useCallback(
    (user: IUser | IAgency) => {
      setData({
        token: data.token,
        user: Object.assign(data.user, user),
      });
      localStorage.setItem('@smia:user', JSON.stringify(user));
    },
    [data.token, data.user],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
