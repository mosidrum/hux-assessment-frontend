import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value,
    });
  };

  const emailVerification = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(values.email)) {
      return true;
    }

    if (!regEx.test(values.email) && values.email !== '') {
      setMessage('Invalid email');
    }
    return false;
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    emailVerification();
    if (!values.password) {
      setMessage('Please enter valid password.');
      return;
    }
    axios.post('http://localhost:8081/login', values)
      .then((res) => {
        if (res.status === 200) {
          setMessage('Login Successful');
          setAuth(true, res.data.name);
          navigate(paths.home);
        }
      })
      .then((err) => {
        setMessage(`${err}`);
      });
  };

  return (
    <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3 shadow-lg">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <i>{message}</i>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" id="email" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="password" onChange={handleChange} />
          </div>
          <div className="d-flex flex-column text-center mb-3">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <div className="d-flex flex-column text-center mb-3">
            <button type="button" className="btn btn-primary" onClick={() => navigate(paths.signup)}>CLick here to Signup</button>
          </div>
          <div className="d-flex flex-column text-center mb-3">
            <button type="button" className="btn btn-primary" onClick={() => navigate(paths.landing)}>Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
