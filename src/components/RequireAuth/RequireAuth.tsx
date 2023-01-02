import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AllRoutes } from '../AppRoutes';

const RequireAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to={AllRoutes.login} state={{ from: `` }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
