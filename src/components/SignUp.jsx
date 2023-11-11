import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';

const SignUp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/register', values)
      .then(() => {
        setMessage('Sign Up Successful');
        navigate(paths.login);
      })
      .catch((err) => setMessage(`${err}`));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {message}
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input type="name" name="name" id="name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} />
      </div>
      <button type="submit">Sign Up</button>
      <div>
        <button type="button" onClick={() => navigate(paths.login)}>CLick here to Login</button>
      </div>
    </form>
  );
};

export default SignUp;
