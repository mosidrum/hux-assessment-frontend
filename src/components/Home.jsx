import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import paths from '../routes/paths';
import useAuthStore from '../store/authStore';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const signedInUser = Cookies.get('user');
        setUser(signedInUser);
        if (isAuthenticated || token) {
          setAuth(true);
        } else {
          setAuth(false, '');
          navigate(paths.login);
        }
      } catch (error) {
        setAuth(false, '');
        navigate(paths.login);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    axios.get('http://localhost:8081/')
      .then((res) => (setContacts(res.data)))
      .catch((err) => (
        setMessage(err)));
  }, [navigate, setAuth, isAuthenticated]);

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
        <>
          {isAuthenticated ? (
            <div>
              <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
                {message && (
                  <div>
                    {message}
                  </div>
                )}
                <div className="w-50 bg-white rounded p-3">
                  <div>
                    <div>
                      <p>welcome {user}</p>
                    </div>
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h2>Contact List</h2>
                    <button className="btn btn-success" type="button" onClick={() => navigate(paths.createContact)}>Create Contact</button>
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
          ) : (
            navigate(paths.login)
          )}
        </>
      )}
    </div>
  );
};

export default Home;
