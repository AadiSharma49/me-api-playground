const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String],
});

const ProfileSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true }, // unique student ID
  name: String,
  email: String,
  education: [String],
  skills: [String],
  projects: [ProjectSchema],
  work: [String],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
 