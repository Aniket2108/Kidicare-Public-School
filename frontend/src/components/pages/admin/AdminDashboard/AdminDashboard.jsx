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


                        {/* Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        {/* <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} /> */}
                        <Route path="/Admin/teachers/addteacher" element={<AddTeacher />} />

                        
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export default AdminDashboard;





{/* <Route path="/Admin/profile" element={<AdminProfile />} /> */}
                        {/* <Route path="/Admin/complains" element={<SeeComplains />} /> */}

                        {/* Notice */}
                        {/* <Route path="/Admin/addnotice" element={<AddNotice />} /> */}
                        {/* <Route path="/Admin/notices" element={<ShowNotices />} /> */}

                        {/* Subject */}
                        {/* <Route path="/Admin/subjects" element={<ShowSubjects />} /> */}
                        {/* <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} /> */}
                        {/* <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} /> */}
                        {/* <Route path="/Admin/addsubject/:id" element={<SubjectForm />} /> */}
                        {/* <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} /> */}
                        {/* <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} /> */}
                        {/* <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} /> */}


{/* Student */}
                        {/* <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} /> */}
                        {/* <Route path="/Admin/students" element={<ShowStudents />} /> */}
                        {/* <Route path="/Admin/students/student/:id" element={<ViewStudent />} /> */}
                        {/* <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} /> */}
                        {/* <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} /> */}

                        {/* Teacher */}
                        {/* <Route path="/Admin/teachers" element={<ShowTeachers />} /> */}
                        {/* <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} /> */}
                        {/* <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} /> */}
                        {/* <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} /> */}
                        {/* <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} /> */}
                        {/* <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} /> */}

                        {/* <Route path="/logout" element={<Logout />} /> */}
