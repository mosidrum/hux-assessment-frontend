import React from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../routes/paths';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <div>
          <button type="button" onClick={() => navigate(paths.signup)}>CLick here to Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
