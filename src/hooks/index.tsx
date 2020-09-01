import React from 'react';

import { AuthProvider } from './useAuth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
