// components/AddJobPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const AddJob = () => {
  const navigate = useNavigate(); 
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/company/create/job', {
        jobTitle,
        companyName,
        description,
        location,
        salary
      });

      if (response.data.success) {
        console.log('Job created successfully');
        window.alert('Job created successfully');
        navigate("/")
      } else {
        setError('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Failed to create job');
    }
  };

  return (
    <Box className="container" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" align="center" gutterBottom>
        Add New Job
      </Typography>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TextField label="Job Name" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      <TextField label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <TextField label="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#18206F", marginTop: '20px' }}>Create Job</Button>
    </Box>
  );
};

export default AddJob;
