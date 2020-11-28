import React from 'react';

import { Container } from './styles';

interface IModalFilterProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

const ModalFilter: React.FC<IModalFilterProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ModalFilter;
