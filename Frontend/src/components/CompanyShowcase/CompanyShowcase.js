import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, CircularProgress, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../actions/loadingActions';

const CompanyShowcase = () => {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(1); // State to manage current page
    const [totalPages, setTotalPages] = useState(1); // State to manage total pages
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.loading.isLoading);

    const postsPerPage = 5; // Number of posts per page

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get(`http://localhost:5000/company/companies?page=${page}&limit=${postsPerPage}`);
                if (response.data.success) {
                    setCompanies(response.data.companies);
                    setTotalPages(response.data.totalPages);
                } else {
                    console.error('Failed to fetch companies:', response.data);
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchCompanies();
    }, [page]); // Fetch companies when page changes

    // Get current job postings for current page
   const indexOfLastPost = page * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = companies.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (event, value) => {
        setPage(value); // Update page state when page changes
    };

    return (
        <Container maxWidth="lg" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <Typography variant="h2" align="center" gutterBottom sx={{ color: "#18206F" }}>
                Company Showcase
            </Typography>
            {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            )}
            {!isLoading && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {currentPosts.map((company, index) => (
                        <Card key={index} variant="outlined" style={{ margin: '10px', width: '200px' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {company.name}
                                </Typography>
                                <img src={`http://localhost:5000/company/${company.imageUrl}`} alt={company.name} style={{ width: '100%' }} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            <Pagination
                count={Math.ceil(companies.length / postsPerPage)} // Total number of pages
                page={page} // Current page
                onChange={handlePageChange} // Function to handle page change
                color="primary"
                size="large"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </Container>
    );
};

export default CompanyShowcase;
