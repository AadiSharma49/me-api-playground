import React, { useState } from 'react';
import { getProfileByRollNo, updateProfile } from '../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function UpdateProfile() {
  const [rollNo, setRollNo] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProfile = async () => {
    if (!rollNo.trim()) {
      setMessage('Please enter a roll number');
      return;
    }
    try {
      const data = await getProfileByRollNo(rollNo.trim());
      setProfileData({
        ...data,
        education: data.education.join(', '),
        skills: data.skills.join(', '),
        work: data.work.join(', '),
        projects: data.projects.map(p => `${p.title}|${p.description}|${p.links.join(',')}`).join('; ')
      });
      setMessage('');
    } catch {
      setMessage('Profile not found');
      setProfileData(null);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData) return;

    setMessage('');
    try {
      const payload = {
        ...profileData,
        education: profileData.education.split(',').map(s => s.trim()),
        skills: profileData.skills.split(',').map(s => s.trim()),
        work: profileData.work.split(',').map(s => s.trim()),
        projects: profileData.projects
          ? profileData.projects.split(';').map(item => {
              const [title, description, links] = item.split('|');
              return {
                title: title.trim(),
                description: description ? description.trim() : '',
                links: links ? links.split(',').map(l => l.trim()) : [],
              };
            })
          : [],
        rollNo: rollNo.trim()
      };
      await updateProfile(rollNo.trim(), payload);
      setMessage('Profile updated successfully!');
    } catch {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>Update Profile</Typography>
      <TextField
        label="Roll Number"
        value={rollNo}
        onChange={handleRollNoChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={fetchProfile} sx={{ mb: 2 }}>
        Load Profile
      </Button>
      {profileData && (
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" value={profileData.name || ''} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Email" name="email" value={profileData.email || ''} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Education (comma separated)" name="education" value={profileData.education || ''} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Skills (comma separated)" name="skills" value={profileData.skills || ''} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Projects (title|desc|link1,link2; separate projects with ;)" name="projects" value={profileData.projects || ''} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Work Experience (comma separated)" name="work" value={profileData.work || ''} onChange={handleChange} fullWidth margin="normal" />
          <TextField
            label="GitHub Link"
            name="github"
            value={profileData.links?.github || ''}
            onChange={e => setProfileData({
              ...profileData,
              links: { ...profileData.links, github: e.target.value }
            })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="LinkedIn Link"
            name="linkedin"
            value={profileData.links?.linkedin || ''}
            onChange={e => setProfileData({
              ...profileData,
              links: { ...profileData.links, linkedin: e.target.value }
            })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Portfolio Link"
            name="portfolio"
            value={profileData.links?.portfolio || ''}
            onChange={e => setProfileData({
              ...profileData,
              links: { ...profileData.links, portfolio: e.target.value }
            })}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Update Profile
            </Button>
          </Box>
        </form>
      )}
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Container>
  );
}

export default UpdateProfile;
