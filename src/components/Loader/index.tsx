import React from 'react';

import { Loading, Object } from './styles';

const Loader: React.FC = () => {
  return (
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
  );
};

export default Loader;
