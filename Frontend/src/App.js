import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'; 
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home'; 
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import JobListings from './components/JobListings/JobListings';
import CompanyShowcase from './components/CompanyShowcase/CompanyShowcase';
import AdminPage from './components/AdminPage/AdminPage'; 
import AddJob from './components/AddJob/AddJob';
import UsersPage from './components/ViewUsers/UsersPage';
import { loginSuccess, logout } from './actions/authActions';

const App = ({ loggedIn, userType, loginSuccess, logout }) => { 
    useEffect(() => {
        document.title = "React Job Portal";
        const token = localStorage.getItem('token');
        if (token) {
            const userType = localStorage.getItem('type'); 
            loginSuccess(token, userType); // Pass both token and userType to loginSuccess
        }
    }, [loginSuccess]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
    };

    return (
        <Router>
            <Navbar isLoggedIn={loggedIn} handleLogout={handleLogout} />
            {loggedIn ? (
                <>
                    <Routes>
                        {/* Routes for employee */}
                        {userType === 'employee' && (
                            <>
                                <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to /home */}
                                <Route path="/home" element={<Home />} /> 
                                <Route path="/about" element={<About />} /> 
                                <Route path="/contact" element={<Contact />} /> 
                                <Route path="/job-listings" element={<JobListings />} />
                                <Route path="/company-showcase" element={<CompanyShowcase />} />
                            </>
                        )}
                        {/* Route for admin page */}
                        {userType === 'admin' && (
                            <>
                                <Route path="/" element={<Navigate to="/admin" />} /> {/* Redirect to /admin */}
                                <Route path="/admin" element={<AdminPage />} />
                                <Route path="/addJob" element={<AddJob />} />
                                <Route path="/viewUsers" element={<UsersPage />} />
                            </>
                        )}
                    </Routes>

                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<Navigate to="/login" />} />
                </Routes>
            )}
        </Router>
    );
};

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    userType: state.auth.userType
});

const mapDispatchToProps = {
    loginSuccess,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
