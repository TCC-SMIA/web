import React from 'react';
import { RouteProps, Navigate } from 'react-router';
import { Route as ReactRoute } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface RProps extends Omit<RouteProps, 'element'> {
  isPrivate?: boolean;
  layout: React.ComponentType;
}

const Manager: React.FC<RProps> = ({ isPrivate, layout: Layout, ...rest }) => {
  const { user } = useAuth();
  const signed = !!user;

  if (!signed && isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/dashboard" replace />;
  }

  return <ReactRoute {...rest} element={<Layout />} />;
};

export default Manager;
