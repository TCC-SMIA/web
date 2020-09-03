import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Link to="signin">SignIn</Link>
      <Link to="signup">SignUp</Link>
    </Container>
  );
};

export default LandingPage;
