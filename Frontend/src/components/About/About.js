import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Typography variant="h2" align="center" gutterBottom sx={{ color: "#18206F" }}>
        About Us
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <Typography variant="body1" paragraph>
              We are passionate about connecting job seekers with their dream opportunities and helping companies find the talent they need to thrive. Our mission is to make the job search process simpler, more efficient, and more rewarding for everyone involved.
            </Typography>
            <Typography variant="body1" paragraph>
              Our team consists of experienced professionals in the fields of technology, human resources, and business development. Together, we work tirelessly to create a platform that offers a seamless experience for job seekers and employers alike.
            </Typography>
            <Typography variant="body1" paragraph>
              At our core, we believe in the power of meaningful connections. We strive to foster a supportive community where individuals can grow personally and professionally. Whether you're a recent graduate looking for your first job or a seasoned professional seeking new challenges, we're here to help you succeed.
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for choosing our platform. We look forward to being part of your journey.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
