const express = require('express');
const Company = require('../models/Company');
const Job = require('../models/JobListing')

const router = express.Router();

router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json({success:true,companies:companies});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new job
router.post('/create/job', async (req, res) => {
    try {
      const { jobTitle, companyName, description, location, salary } = req.body;
  
      // Create a new job
      const newJob = new Job({
        jobTitle,
        companyName,
        description,
        location,
        salary,
        lastUpdated: new Date() // Set the current date as the last updated date
      });
  
      // Save the job to the database
      await newJob.save();
  
      res.status(201).json({ success: true, message: 'Job created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

// Retrieve all jobs
router.get('/jobs/getAll', async (req, res) => {
  try {
    
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;