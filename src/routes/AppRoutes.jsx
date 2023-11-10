import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, SignUp } from '../components';
import paths from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={paths.home} element={<Home />} />
    <Route path={paths.signup} element={<SignUp />} />
    <Route path={paths.login} element={<Login />} />
  </Routes>
);

export default AppRoutes;
