const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  user = new User({ email, password: hash });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const matches = await bcrypt.compare(password, user.password);
  if (!matches) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;
