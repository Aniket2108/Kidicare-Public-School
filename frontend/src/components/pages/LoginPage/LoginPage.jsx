import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, TextField, IconButton, InputAdornment, CircularProgress, Button, CssBaseline } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './LoginPage.css';
import bgpic from "../../../assets/designlogin.jpg";
import axios from "axios";
import { serverUrl } from "../../data/Data";
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const LoginPage = ({ role, setCurrentRole }) => {
    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        emailId: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle input change to update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        setError(""); // Reset error message on each submit

        // Ensure the role is lowercase before making the request
        const roleHeader = role.toLowerCase();

        try {
            const response = await axios.post(
                `${serverUrl}/${roleHeader}/login`, 
                formData
            );

            if (response.status === 200) {
                setError(""); 
                setCurrentRole(role);  // Set current role using useState prop

                switch (role) {
                    case 'Admin':
                        navigate('/Admin/dashboard');
                        break;
                    case 'Student':
                        navigate('/Student/dashboard');
                        break;
                    case 'Teacher':
                        navigate('/Teacher/dashboard');
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            setError("Incorrect credentials. Please try again.");
        } finally {
            setLoader(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            {role} Login
                        </Typography>
                        <Typography variant="h7">
                            Welcome back! Please enter your details
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {role === "Student" ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="rollNumber"
                                        label="Enter your Roll Number"
                                        name="rollNumber"
                                        autoComplete="off"
                                        type="number"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="studentName"
                                        label="Enter your name"
                                        name="studentName"
                                        autoComplete="name"
                                    />
                                </>
                            ) : (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="emailId"
                                    autoComplete="email"
                                    autoFocus
                                    value={formData.emailId}
                                    onChange={handleChange}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            
                            {/* Show error message if login fails */}
                            {error && (
                                <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
                                    {error}
                                </Typography>
                            )}
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                            >
                                Login as Guest
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </ThemeProvider>
    );
}

export default LoginPage;
