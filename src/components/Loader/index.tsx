import React from 'react';

import { Container, Loading, Object } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <Loading>
        <Object />
        <Object />
        <Object />
        <Object />
        <Object />
        <Object />
        <Object />
        <Object />
      </Loading>
    </Container>
  );
};

export default Loader;
