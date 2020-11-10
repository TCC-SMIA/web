import React, { ButtonHTMLAttributes } from 'react';

import Loader from '../Loader';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? <Loader /> : children}
    </Container>
  );
};

export default Button;
