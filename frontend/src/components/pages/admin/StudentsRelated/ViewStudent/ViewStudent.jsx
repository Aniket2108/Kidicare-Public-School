import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography,
    Tab, Paper, BottomNavigation, BottomNavigationAction, Container
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

import CustomBarChart from '../../../CustomBarChart';
import CustomPieChart from '../../../CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../styles';
import Popup from '../../../Popup/Popup';
import { serverUrl } from '../../../../data/Data';
import './ViewStudent.css';
import axios from 'axios';

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);
    const [student, setStudent] = useState();
    const [sclass, setSclass] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const studentId = params.id;
    const address = "Student";

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${serverUrl}/student/${studentId}`);
                const classResponse = await axios.get(`${serverUrl}/standard/${response.data.classId}`);
                setStudent(response.data);
                setSclass(response.data);
            } catch (error) {
                console.error("Error fetching student:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [sclassName, setSclassName] = useState('');
    const [openStates, setOpenStates] = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [userDetails, setUserDetails] = useState();


    useEffect(() => {
        if (student) {
            const userDetails1 = {
                father: {
                    firstName: student.father.firstName,
                    lastName: student.father.lastName,
                    dateOfBirth: student.father.dateOfBirth,
                    mobileNumber: student.father.mobileNumber,
                    emailId: student.father.emailId,
                    aadhaarCard: student.father.aadhaarCard,
                    bloodGroup: student.father.bloodGroup,
                    occupation: student.father.occupation,
                    occupationAddress: student.father.occupationAddress
                },
                mother: {
                    firstName: student.mother.firstName,
                    lastName: student.mother.lastName,
                    dateOfBirth: student.mother.dateOfBirth,
                    mobileNumber: student.mother.mobileNumber,
                    emailId: student.mother.emailId,
                    aadhaarCard: student.mother.aadhaarCard,
                    bloodGroup: student.mother.bloodGroup,
                    occupation: student.mother.occupation,
                    occupationAddress: student.mother.occupationAddress
                },
                student: {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    dateOfBirth: student.dateOfBirth,
                    aadhaarCard: student.aadhaarCard,
                    bloodGroup: student.bloodGroup,
                    rollNum: student.rollNum,
                    classId: sclass?.name || ''
                }
            };
            setUserDetails(userDetails1);
        }
    }, [student, sclass]);


    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedSection, setSelectedSection] = useState('table');
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    // useEffect(() => {
    //     if (userDetails) {
    //         setName(userDetails.name || '');
    //         setRollNum(userDetails.rollNum || '');
    //         setSclassName(userDetails.sclassName || '');
    //         setStudentSchool(userDetails.school || '');
    //         setSubjectMarks(userDetails.examResult || '');
    //         setSubjectAttendance(userDetails.attendance || []);
    //     }
    // }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault()
        // Update student code

    }

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)

    }

    const removeHandler = (id, deladdress) => {
        // remove student
    }

    const removeSubAttendance = (subId) => {
        // remove subject attendance
    }


    const calculateOverallAttendancePercentage = (subjectAttendance) => {
        let totalSessionsSum = 0;
        let presentCountSum = 0;
        const uniqueSubIds = [];

        subjectAttendance.forEach((attendance) => {
            const subId = attendance.subName._id;
            if (!uniqueSubIds.includes(subId)) {
                const sessions = parseInt(attendance.subName.sessions);
                totalSessionsSum += sessions;
                uniqueSubIds.push(subId);
            }
            presentCountSum += attendance.status === "Present" ? 1 : 0;
        });

        if (totalSessionsSum === 0 || presentCountSum === 0) {
            return 0;
        }

        return (presentCountSum / totalSessionsSum) * 100;
    };

    const groupAttendanceBySubject = (subjectAttendance) => {
        const attendanceBySubject = {};

        subjectAttendance.forEach((attendance) => {
            const subName = attendance.subName.subName;
            const sessions = attendance.subName.sessions;
            const subId = attendance.subName._id;

            if (!attendanceBySubject[subName]) {
                attendanceBySubject[subName] = {
                    present: 0,
                    absent: 0,
                    sessions: sessions,
                    allData: [],
                    subId: subId
                };
            }
            if (attendance.status === "Present") {
                attendanceBySubject[subName].present++;
            } else if (attendance.status === "Absent") {
                attendanceBySubject[subName].absent++;
            }
            attendanceBySubject[subName].allData.push({
                date: attendance.date,
                status: attendance.status,
            });
        });
        return attendanceBySubject;
    }

    const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
        if (totalSessions === 0 || presentCount === 0) {
            return 0;
        }
        const percentage = (presentCount / totalSessions) * 100;
        return percentage.toFixed(2); // Limit to two decimal places
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];


    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });


    const StudentDetailsSection = () => {
        if (!userDetails || !userDetails.student || !userDetails.father || !userDetails.mother) {
            return <Typography variant="h6">Loading student details...</Typography>;
        }

        return (
            <div className="details-container">
                {/* Student Details */}
                <Typography variant="h6">Student Name: {userDetails.student.firstName} {userDetails.student.lastName}</Typography>
                <Typography variant="body1">Date Of Birth: {userDetails.student.dateOfBirth}</Typography>
                <Typography variant="body1">Aadhaar: {userDetails.student.aadhaarCard}</Typography>
                <Typography variant="body1">Blood Group: {userDetails.student.bloodGroup}</Typography>
                <Typography variant="body1">Roll Number: {userDetails.student.rollNum}</Typography>
                <Typography variant="body1">Class: {userDetails.student.classId}</Typography>

                <hr />

                {/* Father's Details */}
                <Typography variant="h6">Father's Name: {userDetails.father.firstName} {userDetails.father.lastName}</Typography>
                <Typography variant="body1">Mobile: {userDetails.father.mobileNumber}</Typography>
                <Typography variant="body1">Date Of Birth: {userDetails.father.dateOfBirth}</Typography>
                <Typography variant="body1">Blood Group: {userDetails.father.bloodGroup}</Typography>
                <Typography variant="body1">Email: {userDetails.father.emailId}</Typography>
                <Typography variant="body1">Occupation: {userDetails.father.occupation}</Typography>
                <Typography variant="body1">Aadhaar: {userDetails.father.aadhaarCard}</Typography>

                <hr />

                {/* Mother's Details */}
                <Typography variant="h6">Mother's Name: {userDetails.mother.firstName} {userDetails.mother.lastName}</Typography>
                <Typography variant="body1">Mobile: {userDetails.mother.mobileNumber}</Typography>
                <Typography variant="body1">Date Of Birth: {userDetails.mother.dateOfBirth}</Typography>
                <Typography variant="body1">Blood Group: {userDetails.mother.bloodGroup}</Typography>
                <Typography variant="body1">Email: {userDetails.mother.emailId}</Typography>
                <Typography variant="body1">Occupation: {userDetails.mother.occupation}</Typography>
                <Typography variant="body1">Aadhaar: {userDetails.mother.aadhaarCard}</Typography>

                <hr />

                {subjectAttendance.length > 0 && <CustomPieChart data={subjectAttendance} />}
                <Button variant="contained" className="styled-button" onClick={deleteHandler}>
                    Delete
                </Button>
            </div>
        );
    };



    return (
        <>
            {loading
                ?
                <>
                    <div>Loading...</div>
                </>
                :
                <>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    onChange={handleChange}
                                    sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1000 }}
                                >
                                    <Tab label="Details" value="1" />
                                    <Tab label="Attendance" value="2" />
                                    <Tab label="Marks" value="3" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "5rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <StudentDetailsSection />
                                </TabPanel>
                                {/* <TabPanel value="2">
                                    <StudentAttendanceSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <StudentMarksSection />
                                </TabPanel> */}
                            </Container>
                        </TabContext>
                    </Box>
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

        </>
    )


};

export default ViewStudent;









// {/* <Button variant="contained" sx={styles.styledButton} className="show-tab" onClick={() => { setShowTab(!showTab) }}>
//                     {
//                         showTab
//                             ? <KeyboardArrowUp />
//                             : <KeyboardArrowDown />
//                     }
//                     Edit Student
//                 </Button>
//                 <Collapse in={showTab} timeout="auto" unmountOnExit>
//                     <div className="register">
//                         <form className="registerForm" onSubmit={submitHandler}>
//                             <span className="registerTitle">Edit Details</span>
//                             <label>Name</label>
//                             <input className="registerInput" type="text" placeholder="Enter user's name..."
//                                 value={name}
//                                 onChange={(event) => setName(event.target.value)}
//                                 autoComplete="name" required />

//                             <label>Roll Number</label>
//                             <input className="registerInput" type="number" placeholder="Enter user's Roll Number..."
//                                 value={rollNum}
//                                 onChange={(event) => setRollNum(event.target.value)}
//                                 required />

//                             <label>Password</label>
//                             <input className="registerInput" type="password" placeholder="Enter user's password..."
//                                 value={password}
//                                 onChange={(event) => setPassword(event.target.value)}
//                                 autoComplete="new-password" />

//                             <button className="registerButton" type="submit" >Update</button>
//                         </form>
//                     </div>
//                 </Collapse> */}