import React from 'react';
import { Link } from 'react-router-dom';

import { Container, MenuToolTip, } from './styles';

interface TooltipProps {
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ visible }) => {

  return (
    <Container isVisible={!!visible}>
      <MenuToolTip>
        <Link to="/profile">
          <p>Meu Perfil</p>
        </Link>
        <Link to="/">
          <p>Sair</p>
        </Link>
      </MenuToolTip>
    </Container>
  );
};

export default Tooltip;
