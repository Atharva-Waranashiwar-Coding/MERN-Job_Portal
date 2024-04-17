// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography,CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch hook
import { loginSuccess, loginFailure } from '../../actions/authActions'; // Import action creators
import { setLoading } from '../../actions/loadingActions'; // Import setLoading action

import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const isLoading = useSelector(state => state.loading.isLoading);

  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));
      // Client-side validation
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }
      // Sanitize user inputs
      const sanitizedUsername = username.trim();
      const sanitizedPassword = password.trim();

      const response = await axios.post('http://localhost:5000/user/login', { email: sanitizedUsername, password: sanitizedPassword });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('type', response.data.type);
        dispatch(loginSuccess(response.data.token, response.data.type)); // Dispatch loginSuccess action
        navigate(response.data.type === 'admin' ? '/admin' : '/home');
      } else {
        setError('Invalid username or password.');
        dispatch(loginFailure('Invalid username or password.')); // Dispatch loginFailure action
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password.');
      dispatch(loginFailure('Invalid username or password.')); // Dispatch loginFailure action
    }finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box className="container" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h2" align="center" gutterBottom>
        Login
      </Typography>
      {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
                </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TextField label="Username / Email" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin} sx={{ bgcolor: "#18206F" }}>Login</Button>
    </Box>
  );
};

export default Login;
