import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Button, ButtonGroup, ClickAwayListener,
    Grow, Popper, MenuItem, MenuList
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

import { BlackButton, BlueButton, GreenButton } from '../../../buttonStyles';
import TableTemplate from '../../../TableTemplate/TableTemplate';
import SpeedDialTemplate from '../../../SpeedDialTemplate/SpeedDialTemplate';
import Popup from '../../../Popup/Popup';
import './ShowStudents.css';

import StudentButtonHaver from './StudentButtonHaver';
import axios from 'axios';
import { serverUrl } from '../../../../data/Data';

// Mock data for students
const mockStudents = [
    { _id: '1', name: 'Alice Johnson', rollNum: '101', sclassName: { sclassName: 'Grade 10' } },
    { _id: '2', name: 'Bob Smith', rollNum: '102', sclassName: { sclassName: 'Grade 9' } },
    { _id: '3', name: 'Charlie Brown', rollNum: '103', sclassName: { sclassName: 'Grade 8' } }
];

const ShowStudents = () => {
    const navigate = useNavigate();
    const [studentsList, setStudentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${serverUrl}/admin/`);
    
                // Assuming response.data contains the student list
                setStudentsList(response.data || []);
            } catch (error) {
                console.error("Error fetching students:", error);
                setMessage("Failed to fetch students.");
                setShowPopup(true);
            } finally {
                setLoading(false);
            }
        };
    
        fetchStudents();
    }, []);

    const deleteHandler = (deleteID) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const studentRows = studentsList.map((student) => ({
        name: `${student.firstName} ${student.lastName}`,
        rollNum: student.rollNum,
        // sclassName: student.sclassName.sclassName,
        id: student.id,
    }));

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler()
        },
    ];

    return (
        <div className="show-students-container">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <Box className="button-box">
                        <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
                            Add Students
                        </GreenButton>
                    </Box>
                    <Paper className="table-paper">
                        {studentsList.length > 0 &&
                            <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                        }
                        <SpeedDialTemplate actions={actions} />
                    </Paper>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ShowStudents;
