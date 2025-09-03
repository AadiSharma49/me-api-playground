import React, { useState } from 'react';
import { createProfile } from '../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function ProfileForm({ onProfileCreated }) {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    education: '',
    skills: '',
    projects: '',
    work: '',
    github: '',
    linkedin: '',
    portfolio: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      // Convert comma-separated strings and projects format
      const payload = {
        rollNo: formData.rollNo.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        education: formData.education.split(',').map(s => s.trim()).filter(Boolean),
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        work: formData.work.split(',').map(s => s.trim()).filter(Boolean),
        projects: formData.projects ? formData.projects.split(';').map(item => {
          const [title, description, links] = item.split('|');
          return {
            title: title.trim(),
            description: description?.trim() || '',
            links: links ? links.split(',').map(l => l.trim()) : [],
          };
        }) : [],
        links: {
          github: formData.github.trim(),
          linkedin: formData.linkedin.trim(),
          portfolio: formData.portfolio.trim(),
        },
      };
      await createProfile(payload);
      setMessage({ type: 'success', text: 'Profile created successfully!' });
      setFormData({
        rollNo: '',
        name: '',
        email: '',
        education: '',
        skills: '',
        projects: '',
        work: '',
        github: '',
        linkedin: '',
        portfolio: '',
      });
      onProfileCreated();  // Refresh list
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Error creating profile' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>Add New Student</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField fullWidth label="Roll Number" name="rollNo" value={formData.rollNo} onChange={handleChange} required margin="normal" />
        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required margin="normal" />
        <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" margin="normal" />
        <TextField fullWidth label="Education (comma separated)" name="education" value={formData.education} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Skills (comma separated)" name="skills" value={formData.skills} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Projects (format: title|desc|link1,link2; separate projects with ;)" name="projects" value={formData.projects} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Work Experience (comma separated)" name="work" value={formData.work} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="GitHub Link" name="github" value={formData.github} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="LinkedIn Link" name="linkedin" value={formData.linkedin} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Portfolio Link" name="portfolio" value={formData.portfolio} onChange={handleChange} margin="normal" />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">Add Profile</Button>
        </Box>
      </form>
      {message.text && (
        <Typography color={message.type === 'error' ? 'error' : 'success.main'} sx={{ mt: 2 }}>
          {message.text}
        </Typography>
      )}
    </Container>
  );
}

export default ProfileForm;
