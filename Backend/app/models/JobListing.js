// models/Job.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    required: true
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
