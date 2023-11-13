import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';

const ViewContact = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8081/view/${id}`)
      .then((res) => setData(res.data[0]))
      .catch((err) => setMessage(err));
  }, [id]);

  return (
    <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {message && (
          <div>
            {message}
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.phone}</td>
              <td>
                <button className="btn btn-primary mx-2" type="button" onClick={() => navigate(paths.home)}>Back</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewContact;
