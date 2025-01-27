import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper, Table, TableBody, TableContainer, TableHead, TablePagination,
    Button, Box, IconButton
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { StyledTableCell, StyledTableRow } from '../../../styles';
import { BlueButton, GreenButton } from '../../../buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../SpeedDialTemplate/SpeedDialTemplate';
import Popup from '../../../Popup/Popup';
import './ShowTeachers.css';
import { serverUrl } from "../../../../data/Data";
import axios from 'axios';

const ShowTeachers = () => {
    const [teachersList, setTeachersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${serverUrl}/admin/teacher`
                ); 
                setTeachersList(res.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };
        fetchTeachers();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (response) {
        return (
            <Box className="add-teacher-btn">
                <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")}>
                    Add Teacher
                </GreenButton>
            </Box>
        );
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const columns = [
        { id: 'firstName', label: 'First Name', minWidth: 170 },
        { id: 'lastName', label: 'Last Name', minWidth: 100 },
        { id: 'mobileNumber', label: 'Contact', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => ({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        mobileNumber: teacher.mobileNumber,
        id: teacher.id,
    }));

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/addteacher")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler("all", "Teachers")
        },
    ];

    return (
        <Paper className="teacher-table">
            <TableContainer>
                <Table stickyHeader aria-label="teacher table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow hover key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <StyledTableCell key={column.id}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </StyledTableCell>
                                    );
                                })}
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                                        <PersonRemoveIcon color="error" />
                                    </IconButton>
                                    <BlueButton variant="contained"
                                        onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
                                        View
                                    </BlueButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Paper>
    );
};

export default ShowTeachers;
