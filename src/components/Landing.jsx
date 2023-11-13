import React from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../routes/paths';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
        <div className="w-60 bg-white rounded p-3 text-center">
          <h1>
            Welcome to my Contact Web App
          </h1>
          <p>An assessment test from Hux Ventures. Please Login to use the app</p>
          <div className="d-flex flex-column text-center mb-3">
            <button type="button" className="btn btn-primary" onClick={() => navigate(paths.login)}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
