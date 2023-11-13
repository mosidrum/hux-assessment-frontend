import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import paths from '../routes/paths';

const CreateContact = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    name: '',
    phone: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/create', values)
      .then(() => {
        setValues({
          name: '',
          phone: '',
        });
        navigate(paths.home);
      })
      .catch((err) => {
        setMessage(err);
        setValues({
          name: '',
          phone: '',
        });
      });
  };

  return (
    <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>New Contact</h2>
          <div className="mb-3">
            {message && <div>{message}</div>}
            <label htmlFor="name" className="form-label">Name</label>
            <input className="form-control" type="text" name="name" placeholder="Enter name" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input className="form-control" type="contact" name="phone" placeholder="Enter Phone Number" onChange={handleChange} />
          </div>
          <button className="btn btn-info mx-2" type="button" onClick={() => navigate(paths.home)}>Back</button>
          <button className="btn btn-success" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
