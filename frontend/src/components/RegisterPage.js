import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function RegisterPage({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Remove trailing slash from API base URL if present
  const API_BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
      setMessage('Registration successful! You can now login.');
      if (onRegister) onRegister();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" mb={2}>Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>Register</Button>
        </Box>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Container>
  );
}

export default RegisterPage;
