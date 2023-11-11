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
              <h3>You are authorized,</h3>
              <h3>{user}</h3>
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
