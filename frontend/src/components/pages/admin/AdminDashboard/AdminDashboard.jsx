import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    List,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Drawer } from '../../styles';
import SideBar from '../SideBar/SideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddClass from '../ClassRelated/AddClass/AddClass';
import AdminHomePage from '../AdminHomePage/AdminHomePage';
import ShowClasses from '../ClassRelated/ShowClasses/ShowClasses';
import ClassDetails from '../ClassRelated/ClassDetails/ClassDetails';
import ShowTeachers from '../TeacherRelated/ShowTeachers/ShowTeachers';
import AddTeacher from '../TeacherRelated/AddTeacher/AddTeacher';
import TeacherDetails from '../TeacherRelated/TeacherDetails/TeacherDetails';
import AddStudent from '../StudentsRelated/AddStudent/AddStudent';
import ShowStudents from '../StudentsRelated/ShowStudents/ShowStudents';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: open ? 240 : 60,
                        transition: 'width 0.3s ease',
                        overflowX: 'hidden',
                    }}
                >
                    <Toolbar>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SideBar open={open} />
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />

                        {/* Class Routes */}
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />


                        {/* Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        {/* <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} /> */}
                        <Route path="/Admin/teachers/addteacher" element={<AddTeacher />} />

                        {/* Student */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export default AdminDashboard;
