import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
      <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />
    </AppProvider>
  );
};

export default src;
