import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getAllProfiles = () => axios.get(`${API_BASE}/profiles`).then(res => res.data);

export const getProfileByRollNo = (rollNo) => axios.get(`${API_BASE}/profile/${rollNo}`).then(res => res.data);

export const createProfile = (profileData) => axios.post(`${API_BASE}/profile`, profileData).then(res => res.data);

// Query endpoints with rollNo as query parameter
export const getProjectsBySkill = (rollNo, skill) =>
  axios.get(`${API_BASE}/projects`, { params: { rollNo, skill } }).then(res => res.data);

export const getTopSkills = (rollNo) =>
  axios.get(`${API_BASE}/skills/top`, { params: { rollNo } }).then(res => res.data);

export const searchProfile = (rollNo, q) =>
  axios.get(`${API_BASE}/search`, { params: { rollNo, q } }).then(res => res.data);
// Update profile by rollNo
export const updateProfile = (rollNo, profileData) =>
  axios.put(`${API_BASE}/profile/${rollNo}`, profileData).then(res => res.data);

// Delete profile by rollNo
export const deleteProfile = (rollNo) =>
  axios.delete(`${API_BASE}/profile/${rollNo}`).then(res => res.data);
