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
    <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3">
        <h3 className="text-center">SIGN UP</h3>
        <form onSubmit={handleSubmit}>
          <div>
            {message}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" name="name" id="name" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" id="email" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" id="password" className="form-control" onChange={handleChange} />
          </div>
          <div className="text-center mb-3">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
          <div className="text-center mb-3">
            <button type="button" className="btn btn-primary" onClick={() => navigate(paths.login)}>CLick here to Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
