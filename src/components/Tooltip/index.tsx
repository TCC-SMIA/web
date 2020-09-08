import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Container, MenuToolTip } from './styles';
import { useAuth } from '../../hooks/useAuth';

interface TooltipProps {
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ visible }) => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container isVisible={!!visible}>
      <MenuToolTip>
        <Link to="/profile">
          <p>Meu Perfil</p>
        </Link>
        <Link to="/" onClick={handleSignOut}>
          <p>Sair</p>
        </Link>
      </MenuToolTip>
    </Container>
  );
};

export default Tooltip;
