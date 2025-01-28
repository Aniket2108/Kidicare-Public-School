import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper, Table, TableBody, TableContainer, TableHead, TablePagination,
    Button, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
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

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);


    const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this teacher?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        No
                    </Button>
                    <Button onClick={onConfirm} color="error" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };


    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${serverUrl}/admin/teacher`);
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

    const handleDeleteClick = (teacherId) => {
        setSelectedTeacherId(teacherId);
        setConfirmDialogOpen(true);
    };

    const confirmDelete = async () => {
        setConfirmDialogOpen(false);
        try {
            await axios.delete(`${serverUrl}/admin/teacher/${selectedTeacherId}`);
            setMessage("Teacher Deleted Successfully");
            setShowPopup(true);
            setTeachersList(teachersList.filter(teacher => teacher.id !== selectedTeacherId));
            setTimeout(() => {
                setShowPopup(false);
              }, 2000);
        } catch (err) {
            console.error("Failed to delete teacher:", err);
        }
        
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
                        {teachersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((teacher) => (
                            <StyledTableRow hover key={teacher.id}>
                                {columns.map((column) => {
                                    const value = teacher[column.id];
                                    return (
                                        <StyledTableCell key={column.id}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </StyledTableCell>
                                    );
                                })}
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => handleDeleteClick(teacher.id)}>
                                        <PersonRemoveIcon color="error" />
                                    </IconButton>
                                    <BlueButton variant="contained"
                                        onClick={() => navigate("/Admin/teachers/teacher/" + teacher.id)}>
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
            <ConfirmDeleteDialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} onConfirm={confirmDelete} />
        </Paper>
    );
};

export default ShowTeachers;





    

    

//     return (
//         <Paper className="teacher-table">
//             <TableContainer>
//                 <Table stickyHeader aria-label="teacher table">
//                     <TableHead>
//                         <StyledTableRow>
//                             {columns.map((column) => (
//                                 <StyledTableCell key={column.id} style={{ minWidth: column.minWidth }}>
//                                     {column.label}
//                                 </StyledTableCell>
//                             ))}
//                             <StyledTableCell align="center">Actions</StyledTableCell>
//                         </StyledTableRow>
//                     </TableHead>
//                     <TableBody>
//                         {teachersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((teacher) => (
//                             <StyledTableRow hover key={teacher.id}>
//                                 {columns.map((column) => (
//                                     <StyledTableCell key={column.id}>
//                                         {teacher[column.id]}
//                                     </StyledTableCell>
//                                 ))}
//                                 <StyledTableCell align="center">
//                                     <IconButton onClick={() => handleDeleteClick(teacher.id)}>
//                                         <PersonRemoveIcon color="error" />
//                                     </IconButton>
//                                     <BlueButton variant="contained" onClick={() => navigate(`/Admin/teachers/teacher/${teacher.id}`)}>
//                                         View
//                                     </BlueButton>
//                                 </StyledTableCell>
//                             </StyledTableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
            
            
//         </Paper>
//     );
// };
