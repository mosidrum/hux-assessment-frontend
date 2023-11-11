import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import paths from '../routes/paths';
import useAuthStore from '../store/authStore';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
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
        console.log(err)));
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

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {isAuthenticated ? (
            <div>
              <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <p>You are authorized,</p>
                <p>{user}</p>
                <div className="w-50 bg-white rounded p-3">
                  <div>
                    <h2>Contact List</h2>
                    <button type="button" onClick={() => navigate(paths.createContact)}>Create Contact</button>
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
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={index}>
                          <td>{contact.id}</td>
                          <td>{contact.name}</td>
                          <td>{contact.phone}</td>
                          <td>
                            <button onClick={() => navigate(`${paths.viewContact}/${contact.id}`)} type="button">View</button>
                            <button onClick={() => navigate(`${paths.editContact}/${contact.id}`)} type="button">Edit</button>
                            <button type="button">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
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
