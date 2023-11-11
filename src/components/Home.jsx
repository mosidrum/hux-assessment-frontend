import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
          setUser(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => setMessage(err.statusText));
  }, [navigate]);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(() => {
        setAuth(false);
        setUser('');
        navigate(paths.login);
      }).catch((err) => setMessage(err));
  };

  return (
    <div>
      { auth ? (
        <div>
          <h3>
            you are authorized...
            {user}
          </h3>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login</h3>
          <button type="button" onClick={() => navigate(paths.login)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Home;
