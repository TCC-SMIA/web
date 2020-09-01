import React, { lazy } from 'react';
import { Routes } from 'react-router-dom';

import Route from './Route';

const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={LandingPage} />
      <Route path="/signin" element={SignIn} />
      <Route path="/signup" element={SignUp} />
      <Route path="/dashboard" isPrivate element={Dashboard} />
    </Routes>
  );
};

export default MainRoutes;
