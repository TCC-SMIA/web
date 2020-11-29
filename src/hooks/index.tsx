import React from 'react';

import { AuthProvider } from './useAuth';
import { ChatIdProvider } from './useChat';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ChatIdProvider>{children}</ChatIdProvider>
  </AuthProvider>
);

export default AppProvider;
