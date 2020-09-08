import React, { lazy } from 'react';
import { Routes } from 'react-router-dom';

import Route from './Route';
import Manager from './Manager';
import AuthLayout from '../pages/_layouts/AuthLayout';
import DefaultLayout from '../pages/_layouts/DefaultLayout';

const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Manager layout={DefaultLayout}>
        <Route path="/" element={LandingPage} />
        <Route path="/signin" element={SignIn} />
        <Route path="/signup" element={SignUp} />
        <Route path="/forgot-password" element={ForgotPassword} />
        <Route path="/reset-password" element={ResetPassword} />
      </Manager>

      <Manager isPrivate layout={AuthLayout}>
        <Route path="/dashboard" element={Dashboard} />
        <Route path="/profile" element={Profile} />
      </Manager>
    </Routes>
  );
};

export default MainRoutes;
