import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <Container>
      <input {...rest} />
    </Container>
  );
};

export default Input;
