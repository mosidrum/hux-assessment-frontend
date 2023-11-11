import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../routes/paths';
import useAuthStore from '../store/authStore';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081');
        if (response.status === 200) {
          setAuth(true, response.data.name); // Update Zustand store
        } else {
          setAuth(false, '');
        }
      } catch (error) {
        setAuth(false, '');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, setAuth]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8081/logout');
      setAuth(false, '');
      navigate(paths.login);
    } catch (error) {
      // Handle error
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
            <div>
              <h3>Login</h3>
              <button type="button" onClick={() => navigate(paths.login)}>
                Login
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
