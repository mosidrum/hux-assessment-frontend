import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value,
    });
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then((res) => {
        if (res.status === 200) {
          setMessage('Login Successful');
          navigate(paths.home);
        }
      })
      .then((err) => {
        setMessage(err.statusText);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {message}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
        <div>
          <button type="button" onClick={() => navigate(paths.signup)}>CLick here to Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
