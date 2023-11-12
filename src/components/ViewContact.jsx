import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';

const ViewContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8081/view/${id}`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Contact Details</h2>
        <h3>{data.id}</h3>
        <h3>{data.name}</h3>
        <h3>{data.phone}</h3>
        <button className="btn btn-primary mx-2" type="button" onClick={() => navigate(paths.home)}>Back</button>
        <button className="btn btn-primary" type="button">Edit</button>
      </div>
    </div>
  );
};

export default ViewContact;
