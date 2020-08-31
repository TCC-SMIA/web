import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import GlobalStyle from './styles/global';
import Routes from './routes';
import AppProvider from './hooks/index';

const src: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </AppProvider>
  );
};

export default src;
