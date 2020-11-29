import React from 'react';
import { FiX } from 'react-icons/fi';

import { Container, CloseButton } from './styles';

interface IModalFilterProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ModalFilter: React.FC<IModalFilterProps> = ({
  onClose,
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <CloseButton onClick={onClose}>
        <FiX />
      </CloseButton>
      {children}
    </Container>
  );
};

export default ModalFilter;
