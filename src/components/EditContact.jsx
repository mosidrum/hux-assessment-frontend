import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';

const EditContact = () => {
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/view/${id}`)
      .then((res) => setValues({ ...values, name: res.data[0].name, phone: res.data[0].phone }))
      .catch((err) => setMessage(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/edit/${id}`, values)
      .then(() => {
        navigate(paths.home);
      }).catch((err) => setMessage(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {message && (
          <div>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input className="form-control" value={values.name} type="text" name="name" placeholder="Enter name" onChange={(e) => setValues({ ...values, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone</label>
            <input className="form-control" value={values.phone} type="tel" name="phone" placeholder="Enter Phone Number" onChange={(e) => setValues({ ...values, phone: e.target.value })} />
          </div>
          <button onClick={() => navigate(paths.home)} className="btn btn-info" type="button">Back</button>
          <button className="btn btn-success mx-3" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
