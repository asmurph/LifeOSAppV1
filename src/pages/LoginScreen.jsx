import React from 'react';
import { Button, Box } from '@mui/material';
import { useAuth } from '../useAuth';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/DailyRoutinesScreen');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginScreen;
