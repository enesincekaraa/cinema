import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

export const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
