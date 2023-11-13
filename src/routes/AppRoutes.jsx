import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  CreateContact,
  EditContact, Home,
  Landing,
  Login,
  SignUp,
  ViewContact,
} from '../components';
import paths from './paths';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path={paths.landing} element={<Landing />} />
    <Route path={paths.login} element={<Login />} />
    <Route path={paths.signup} element={<SignUp />} />
    <Route paths={paths.home} element={<ProtectedRoute />}>
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.createContact} element={<CreateContact />} />
      <Route path={`${paths.viewContact}/:id`} element={<ViewContact />} />
      <Route path={`${paths.editContact}/:id`} element={<EditContact />} />
    </Route>
  </Routes>
);

export default AppRoutes;
