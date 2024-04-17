import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { logout } from '../../actions/authActions'; // Import logout action
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const dispatch = useDispatch(); // Initialize dispatch function

    // Get isLoggedIn state from Redux store
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    console.log(isLoggedIn)
    // Get userType state from Redux store
    const userType = useSelector(state => state.auth.userType);

    const handleLogout = () => {
        dispatch(logout()); // Dispatch logout action
        localStorage.removeItem('token'); // Remove token from local storage
        navigate("/");
    };

    return (
        <div className="navbar">
            <AppBar position="static" sx={{ bgcolor: "#18206F" }}>
                <Toolbar>
                    <Typography variant="h6" className="navbar-brand">
                        Job Portal
                    </Typography>
                    {isLoggedIn ? (
                        <>
                            {userType === 'admin' ? (
                                <>
                                    <Button color="inherit" component={Link} to="/admin" className="nav-button">Admin</Button>
                                    <Button color="inherit" component={Link} to="/viewUsers" className="nav-button">View Users</Button>
                                    <Button color="inherit" component={Link} to="/addJob" className="nav-button">Add Job Listing</Button>
                                    <Button color="inherit" onClick={handleLogout} className="nav-button">Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} to="/" className="nav-button">Home</Button>
                                    <Button color="inherit" component={Link} to="/about" className="nav-button">About</Button>
                                    <Button color="inherit" component={Link} to="/contact" className="nav-button">Contact</Button>
                                    <Button color="inherit" component={Link} to="/job-listings" className="nav-button">Job Listings</Button>
                                    <Button color="inherit" component={Link} to="/company-showcase" className="nav-button">Company Showcase</Button>
                                    <Button color="inherit" onClick={handleLogout} className="nav-button">Logout</Button>
                                </>
                            )}
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/" className="nav-button">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
