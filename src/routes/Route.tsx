import React, { Suspense } from 'react';
import { RouteProps, Navigate } from 'react-router';
import { Route as ReactRoute } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface RProps extends Omit<RouteProps, 'element'> {
  isPrivate?: boolean;
  element: React.ComponentType;
}

const Route: React.FC<RProps> = ({ isPrivate, element: Element, ...rest }) => {
  const { user } = useAuth();
  const signed = user;

  if (!signed && isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ReactRoute
      {...rest}
      element={
        <Suspense fallback={<h1>s</h1>}>
          <Element />
        </Suspense>
      }
    />
  );
};

export default Route;
