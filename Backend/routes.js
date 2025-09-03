const express = require('express');
const router = express.Router();
const Profile = require('./models');

// Create a new profile (returns error if rollNo already exists)
router.post('/profile', async (req, res) => {
  try {
    const { rollNo } = req.body;
    if (!rollNo) return res.status(400).json({ error: 'rollNo is required' });

    const existing = await Profile.findOne({ rollNo });
    if (existing) return res.status(409).json({ error: 'Profile with this rollNo already exists' });

    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error in POST /profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all profiles
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.json(profiles);
  } catch (error) {
    console.error('Error in GET /profiles:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single profile by rollNo
router.get('/profile/:rollNo', async (req, res) => {
  try {
    const profile = await Profile.findOne({ rollNo: req.params.rollNo });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error in GET /profile/:rollNo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile by rollNo
router.put('/profile/:rollNo', async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error in PUT /profile/:rollNo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete profile by rollNo
router.delete('/profile/:rollNo', async (req, res) => {
  try {
    const result = await Profile.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!result) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /profile/:rollNo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Query projects for a specific profile by rollNo and skill
router.get('/projects', async (req, res) => {
  try {
    const { rollNo, skill } = req.query;
    if (!rollNo) return res.status(400).json({ error: 'rollNo query parameter is required' });
    if (!skill) return res.status(400).json({ error: 'skill query parameter is required' });

    const profile = await Profile.findOne({ rollNo });
    if (!profile || !profile.projects) return res.json([]);

    const skillLower = skill.toLowerCase();

    const filteredProjects = profile.projects.filter(project =>
      project.title.toLowerCase().includes(skillLower) ||
      (project.description && project.description.toLowerCase().includes(skillLower)) ||
      (project.links && project.links.some(link => link.toLowerCase().includes(skillLower)))
    );

    res.json(filteredProjects);
  } catch (error) {
    console.error('Error in GET /projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get top unique skills for a profile by rollNo
router.get('/skills/top', async (req, res) => {
  try {
    const rollNo = req.query.rollNo;
    if (!rollNo) return res.status(400).json({ error: 'rollNo query parameter is required' });

    const profile = await Profile.findOne({ rollNo });
    if (!profile || !profile.skills) return res.json([]);

    const uniqueSkills = Array.from(new Set(profile.skills));
    uniqueSkills.sort();

    res.json(uniqueSkills);
  } catch (error) {
    console.error('Error in GET /skills/top:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// General search within a profile by rollNo and search query q
router.get('/search', async (req, res) => {
  try {
    const { rollNo, q } = req.query;
    if (!rollNo) return res.status(400).json({ error: 'rollNo query parameter is required' });
    if (!q) return res.status(400).json({ error: 'Search query parameter q is required' });

    const profile = await Profile.findOne({ rollNo });
    if (!profile) return res.json({});

    const qLower = q.toLowerCase();

    const matchedProjects = profile.projects.filter(proj =>
      proj.title.toLowerCase().includes(qLower) || (proj.description && proj.description.toLowerCase().includes(qLower))
    );

    const matchedSkills = profile.skills.filter(skill => skill.toLowerCase().includes(qLower));
    const matchedEducation = profile.education.filter(edu => edu.toLowerCase().includes(qLower));
    const matchedWork = profile.work.filter(job => job.toLowerCase().includes(qLower));
    const nameMatch = profile.name.toLowerCase().includes(qLower) ? profile.name : null;

    res.json({
      name: nameMatch,
      education: matchedEducation,
      skills: matchedSkills,
      projects: matchedProjects,
      work: matchedWork,
    });
  } catch (error) {
    console.error('Error in GET /search:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
