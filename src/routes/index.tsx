import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const LandingPage = lazy(() => import('../pages/LandingPage'));

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<h1>Loading</h1>}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route
        path="/signin"
        element={
          <Suspense fallback={<h1>Loading</h1>}>
            <SignIn />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<h1>Loading</h1>}>
            <SignUp />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
