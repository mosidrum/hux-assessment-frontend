import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import paths from '../routes/paths';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8081/');
        setLoading(false);
        setContacts(res.data);
      } catch (err) {
        setLoading(false);
        setMessage(err.message);
      }
    };

    fetchData();
    const loggedInUser = Cookies.get('user');
    setUser(loggedInUser);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8081/logout');
      Cookies.remove('token');
      Cookies.remove('user');
      navigate(paths.login);
    } catch (error) {
      // error handling and formatting goes here
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then(() => {
        window.location.reload();
      }).catch((err) => setMessage(err));
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
            {message && (
              <div>
                {message}
              </div>
            )}
            <div className="w-75 bg-white rounded p-3">
              <div className="d-flex justify-content-end align-items-center gap-2 mb-5">
                <div>
                  {/* eslint-disable react/jsx-one-expression-per-line */}
                  <p className="m-0"> Welcome {user} !</p>
                </div>
                <button type="button" className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <div className="d-flex justify-content-between">
                <h2>Contact List</h2>
                <button className="btn btn-outline-primary" type="button" onClick={() => navigate(paths.createContact)}>Create Contact</button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>S/NO</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>{index + 1}</td>
                      <td>{contact.name}</td>
                      <td>{contact.phone}</td>
                      <td>
                        <button className="btn btn-sm btn-info" onClick={() => navigate(`${paths.viewContact}/${contact.id}`)} type="button">View</button>
                        <button className="btn btn-sm btn-primary mx-2" onClick={() => navigate(`${paths.editContact}/${contact.id}`)} type="button">Edit</button>
                        <button className="btn btn-sm btn-danger" type="button" onClick={() => handleDelete(contact.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      )
    </div>
  );
};

export default Home;
