// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import './Home.css';
import { useSelector} from 'react-redux';

const Home = () => {
  const token = useSelector(state => state.auth.token);

  let user = null;
  
  if (token) {
    const decodedToken = jwtDecode(token);
    user = decodedToken.user;
  }

  return (
    <div className="page-container">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome {user? user.fullName + ", " : ""}to the Job Portal !
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
      Find your dream job here!
      </Typography>
      <br></br><br></br><br></br><br></br>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="div" className="card-title">
                About Us
              </Typography>
              <Typography variant="body2" className="card-description">
                Learn more about our mission, vision, and values.
              </Typography>
              <Button component={Link} to="/about" variant="contained" color="primary" className="card-button" sx={{ bgcolor: "#18206F" }}>
                About
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="div" className="card-title">
                Contact Us
              </Typography>
              <Typography variant="body2" className="card-description">
                Get in touch with us for any queries or assistance.
              </Typography>
              <Button component={Link} to="/contact" variant="contained" color="primary" className="card-button" sx={{ bgcolor: "#18206F" }}>
                Contact
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="div" className="card-title">
                Job Listings
              </Typography>
              <Typography variant="body2" className="card-description">
                Explore available job opportunities in various fields.
              </Typography>
              <Button component={Link} to="/job-listings" variant="contained" color="primary" className="card-button" sx={{ bgcolor: "#18206F" }}>
                Job Listings
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="div" className="card-title">
                Company Showcase
              </Typography>
              <Typography variant="body2" className="card-description">
                Discover featured companies and their profiles.
              </Typography>
              <Button component={Link} to="/company-showcase" variant="contained" color="primary" className="card-button" sx={{ bgcolor: "#18206F" }}>
                Company Showcase
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
