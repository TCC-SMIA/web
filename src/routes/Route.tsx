import React, { Suspense } from 'react';
import { RouteProps } from 'react-router';
import { Route as ReactRoute } from 'react-router-dom';

interface RProps extends Omit<RouteProps, 'element'> {
  element: React.ComponentType;
}

const Route: React.FC<RProps> = ({ element: Element, ...rest }) => {
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
