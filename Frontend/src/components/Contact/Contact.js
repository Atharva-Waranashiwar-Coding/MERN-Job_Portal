import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Divider, Paper } from '@mui/material';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to server
        console.log(formData);
    };

    return (
        <Container maxWidth="lg" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <Typography variant="h2" align="center" gutterBottom sx={{ color: "#18206F" }}>
                Contact Us
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <form onSubmit={handleSubmit}>
                        <Typography variant="h5" align="center" gutterBottom sx={{ color: "#18206F" }}>
                            Queries / Feedback
                        </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: "#18206F" }}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Box>
                            <Typography variant="h5" gutterBottom sx={{ color: "#18206F" }}>
                                Contact Details
                            </Typography>
                            <Divider />
                            <Box mt={2}>
                                <Typography variant="subtitle1">
                                    Email: info@example.com
                                </Typography>
                                <Typography variant="subtitle1">
                                    Phone: +1-123-456-7890
                                </Typography>
                                <Typography variant="subtitle1">
                                    Address: 123 Main St, City, Country
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
