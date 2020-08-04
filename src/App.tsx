import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import GlobalStyle from './styles/global';
import Routes from './routes';

const src: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default src;
