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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>New Contact</h2>
          <div>
            {message && <div>{message}</div>}
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Enter name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input type="contact" name="phone" placeholder="Enter Phone Number" onChange={handleChange} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
