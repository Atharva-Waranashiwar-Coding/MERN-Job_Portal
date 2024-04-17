import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setLoading } from '../../actions/loadingActions'; // Import setLoading action

const JobPostings = () => {
  const dispatch = useDispatch(); // Initialize dispatch function
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Number of job postings per page

  // Get isLoading state from Redux store
  const isLoading = useSelector(state => state.loading.isLoading);

  // State to store job postings
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        // Set loading to true before making API call
        dispatch(setLoading(true));

        // Fetch job postings
        const response = await axios.get('http://localhost:5000/company/jobs/getAll');
        setJobPostings(response.data);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      } finally {
        setTimeout(async () => {
            dispatch(setLoading(false));
          }, 2000); // 5 seconds delay
      }
    };

    fetchJobPostings();
  }, [dispatch]); // Add dispatch to dependency array

   // Get current job postings for current page
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = jobPostings.slice(indexOfFirstPost, indexOfLastPost);

   // Change page
   const handleChangePage = (event, value) => {
       setCurrentPage(value);
   };

  // Function to calculate the difference between two dates in days
  const daysAgo = (date) => {
    const currentDate = new Date();
    const updatedDate = new Date(date);
    const difference = Math.floor((currentDate - updatedDate) / (1000 * 60 * 60 * 24));
    return `${difference} ${difference === 1 ? 'day' : 'days'} ago`;
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <Typography variant="h2" align="center" gutterBottom sx={{ color: "#18206F" }}>
                Job Listings
            </Typography>
               {/* Display loading indicator if isLoading is true */}
            {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
                </div>
            )}
            {!isLoading &&(
                <>
                    <Grid container spacing={3}>
                    {currentPosts.map((job) => (
                        <Grid key={job.id} item xs={12} sm={6} md={4}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" gutterBottom sx={{ color: "#18206F" }}>
                                        {job.jobTitle}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                        {job.companyName} - {job.location}
                                    </Typography>
                                    <Typography variant="body1">
                                        {job.description}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                        Last Updated: {daysAgo(job.lastUpdated)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
                    <Pagination
                        count={Math.ceil(jobPostings.length / postsPerPage)} // Calculate total number of pages
                        page={currentPage}
                        onChange={handleChangePage}
                        color="primary"
                        sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                    />
                </>
            )}
            
        </Container>
  );
};

export default JobPostings;
