import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import './TeacherDetails.css';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const { id: teacherID } = useParams();

    const [teacherDetails, setTeacherDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await fetch(`https://api.example.com/teachers/${teacherID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch teacher details');
                }
                const data = await response.json();
                setTeacherDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherDetails();
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
                        Teacher Name: {teacherDetails?.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Class Name: {teacherDetails?.teachSclass?.sclassName}
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
