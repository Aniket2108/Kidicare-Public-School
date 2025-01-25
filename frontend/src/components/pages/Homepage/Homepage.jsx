import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import './Homepage.css'; // Import CSS for styles
import Students from "../../../assets/students.svg";
import { LightPurpleButton } from '../buttonStyles';

const Homepage = () => {
    return (
        <div className="homepage-container">
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" className="students-image" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="styled-paper">
                        <h1 className="styled-title">
                            Welcome to
                            <br />
                            School Management
                            <br />
                            System
                        </h1>
                        <p className="styled-text">
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </p>
                        <div className="styled-box">
                            <Link to="/choose" className="styled-link">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </Link>
                            {/* <Link to="/chooseasguest" className="styled-link">
                                <Button variant="outlined" fullWidth
                                    sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                >
                                    Login as Guest
                                </Button>
                            </Link> */}
                            {/* <p className="styled-text">
                                Don't have an account?{' '}
                                <Link to="/Adminregister" className="signup-link">
                                    Sign up
                                </Link>
                            </p> */}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Homepage;
