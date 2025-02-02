import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import './TeacherDetails.css';
import { serverUrl } from "../../../../data/Data";
import axios from 'axios';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const { id: teacherID } = useParams();

    const [teacherDetails, setTeacherDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const response = await axios.get(`${serverUrl}/admin/teacher/${teacherID}`);
                setTeacherDetails(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch teacher details");
            } finally {
                setLoading(false);
            }
        };
    
        if (teacherID) {
            fetchTeacherDetails();
        }
    }, [teacherID]);

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <div className="teacher-details-container">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <Container className="teacher-details-content">
                    <Typography variant="h4" align="center" gutterBottom>
                        Teacher Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                    Teacher Name: {teacherDetails?.firstName && teacherDetails?.lastName ? `${teacherDetails.firstName} ${teacherDetails.lastName}` : ""}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Mobile Number: {teacherDetails?.mobileNumber}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Email Id: {teacherDetails?.emailId}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        DOB: {teacherDetails?.dateOfBirth}
                    </Typography>
                    {isSubjectNamePresent ? (
                        <div className="subject-info">
                            <Typography variant="h6" gutterBottom>
                                Subject Name: {teacherDetails?.teachSubject?.subName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                            </Typography>
                        </div>
                    ) : (
                        <Button variant="contained" onClick={handleAddSubject} className="add-subject-button">
                            Add Subject
                        </Button>
                    )}
                </Container>
            )}
        </div>
    );
};

export default TeacherDetails;
