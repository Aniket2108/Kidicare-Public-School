import React, { useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../../../Popup/Popup";
import "../SubjectForm/SubjectForm.css"; // Importing the separate CSS file
import axios from "axios";
import { serverUrl } from "../../../../data/Data";

const SubjectForm = () => {
    const navigate = useNavigate();
    const { id: classId } = useParams(); // Getting classId from params

    const [subjects, setSubjects] = useState([
        { name: "", subjectCode: "", sessions: "", classId: classId }
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubjectChange = (index, field) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = event.target.value;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { name: "", subjectCode: "", sessions: "", classId: classId }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true);

        try {
            const payload = { subjects }; // Correct format: { subjects: [...] }

            const response = await axios.post(`${serverUrl}/admin/subject`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // setMessage("Subjects added successfully!");
            // setShowPopup(true);

            // setTimeout(() => {
            //     navigate("/Admin/subjects");
            // }, 1500);
        } catch (error) {
            console.error("Error adding subjects:", error);
            setMessage("Failed to add subjects. Please try again.");
            setShowPopup(true);
        } finally {
            setLoader(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="subject-form">
            <Box mb={2} className="form-header">
                <Typography variant="h6">Add Subjects</Typography>
            </Box>
            <Grid container spacing={2}>
                {subjects.map((subject, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Subject Name"
                                variant="outlined"
                                value={subject.name}
                                onChange={handleSubjectChange(index, "name")}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                fullWidth
                                label="Subject Code"
                                variant="outlined"
                                value={subject.subjectCode}
                                onChange={handleSubjectChange(index, "subjectCode")}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                fullWidth
                                label="Sessions"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={subject.sessions}
                                onChange={handleSubjectChange(index, "sessions")}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="subject-actions">
                            {index === 0 ? (
                                <Button variant="outlined" color="primary" onClick={handleAddSubject}>
                                    Add Subject
                                </Button>
                            ) : (
                                <Button variant="outlined" color="error" onClick={handleRemoveSubject(index)}>
                                    Remove
                                </Button>
                            )}
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12} className="form-actions">
                    <Button variant="contained" color="primary" type="submit" disabled={loader}>
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Save"}
                    </Button>
                </Grid>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Grid>
        </form>
    );
};

export default SubjectForm;
