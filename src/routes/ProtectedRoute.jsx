import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import paths from './paths';
import useAuthStore from '../store/authStore';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token && !isAuthenticated) {
      navigate(paths.login);
    }
  }, [isAuthenticated, token, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
