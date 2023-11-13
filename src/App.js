import React from 'react';
import axios from 'axios';
import { AppRoutes } from './routes';

axios.defaults.withCredentials = true;

const App = () => (
  <div>
    <AppRoutes />
  </div>
);

export default App;
