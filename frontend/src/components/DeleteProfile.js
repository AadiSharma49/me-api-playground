import React, { useState } from 'react';
import { deleteProfile } from '../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function DeleteProfile() {
  const [rollNo, setRollNo] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    if (!rollNo) {
      setMessage('Please enter a roll number');
      return;
    }
    setMessage('');
    try {
      await deleteProfile(rollNo.trim());
      setMessage('Profile deleted successfully!');
      setRollNo('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to delete profile');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>Delete Profile</Typography>
      <TextField
        label="Roll Number"
        value={rollNo}
        onChange={e => setRollNo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box mt={2}>
        <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
      </Box>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Container>
  );
}

export default DeleteProfile;
