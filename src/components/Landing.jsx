import React from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../routes/paths';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Landing</div>
      <button type="button" onClick={() => navigate(paths.login)}>Login</button>
    </>
  );
};

export default Landing;
