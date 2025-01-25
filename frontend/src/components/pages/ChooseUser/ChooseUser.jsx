import React from 'react';
import { Grid, Container, Paper, Box } from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import './ChooseUser.css';
import { Link } from 'react-router-dom';

const ChooseUser = () => {
  return (
    <div className="choose-user-container">
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/AdminLogin" className="styled-link">
            <div className="card">
              <Paper elevation={3} className="choose-user-paper">
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <h2 className="choose-user-title">Admin</h2>
                <p>Login as an administrator to access the dashboard and manage app data.</p>
              </Paper>
            </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/StudentLogin" className="styled-link">
            <div className="card">
              <Paper elevation={3} className="choose-user-paper">
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <h2 className="choose-user-title">Student</h2>
                <p>Login as a student to explore course materials and assignments.</p>
              </Paper>
            </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/TeacherLogin" className="styled-link">
            <div className="card">
              <Paper elevation={3} className="choose-user-paper">
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <h2 className="choose-user-title">Teacher</h2>
                <p>Login as a teacher to create courses, assignments, and track student progress.</p>
              </Paper>
            </div>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ChooseUser;