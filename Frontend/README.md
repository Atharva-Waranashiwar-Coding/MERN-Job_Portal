# Job Portal

## Overview
The Job Portal project is a web application designed to help job seekers find employment opportunities and connect with potential employers. Employers can post job listings, while job seekers can search for jobs, apply to them, and manage their applications.

## Features
- User authentication: Users can log in, and log out securely.
- Job listings: Employers posted job listings with details such as job title, description, requirements, and location.
- Job search: Job seekers can search for job listings based on keywords, location, category, etc.
- Company profiles: Employers can create profiles for their companies, providing information such as company name, logo, description, and contact details.

## Technologies Used
- **Frontend:**
  - React: JavaScript library for building user interfaces
  - React Router: Library for handling navigation and routing in React applications
  - Material-UI: React component library for building UIs with Material Design
  - Axios: Promise-based HTTP client for making AJAX requests
- **Backend:**
  - Node.js: JavaScript runtime for building server-side applications
  - Express: Web application framework for Node.js
  - MongoDB: NoSQL database for storing application data
  - Mongoose: MongoDB object modeling tool for Node.js
  - JWT (JSON Web Tokens): Standard for creating access tokens that assert some number of claims

## Project Structure
The project follows a client-server architecture:

- **Client (Frontend):**
  - `src/`: Contains all frontend code
    - `components folders`: Reusable React components - About, CompanyShowcase, Contact, Home, JobListings, Login, Navbar
    - `App.js`: Main entry point for the frontend application
    - `index.js`: Entry point for rendering the React application

- **Server (Backend):**
  - `server.js`: Main entry point for the backend application
  - `models`: Contains Mongoose models for defining database schemas - users and companies

## Navigation
The Job Portal application consists of several pages accessible via the navigation menu:

- **Home**: Landing page of the application, providing an overview and quick access to other sections.
- **About**: Information about the Job Portal project, its purpose, features, and technologies used.
- **Job Listings**: Browse and search for available job listings posted by employers.
- **Company Showcase**: Explore featured companies and their profiles.
- **Contact**: Get in touch with the administrators or support team for assistance.
