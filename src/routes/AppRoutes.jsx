import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Home,
  Landing,
  Login,
  SignUp,
} from '../components';
import paths from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={paths.landing} element={<Landing />} />
    <Route path={paths.home} element={<Home />} />
    <Route path={paths.login} element={<Login />} />
    <Route path={paths.signup} element={<SignUp />} />
  </Routes>
);

export default AppRoutes;
