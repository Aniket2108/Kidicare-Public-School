// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//     Box, Container, Typography, Tab, IconButton,
// } from "@mui/material";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import { BlueButton, GreenButton, PurpleButton } from "../../../buttonStyles";
// import TableTemplate from "../../../TableTemplate/TableTemplate";
// import SpeedDialTemplate from "../../../SpeedDialTemplate/SpeedDialTemplate";
// import Popup from "../../../Popup/Popup";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import "./ClassDetails.css";
// import axios from "axios";
// import { serverUrl } from "../../../../data/Data";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box, Container, Typography, Tab, IconButton,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BlueButton, GreenButton, PurpleButton } from "../../../buttonStyles";
import TableTemplate from "../../../TableTemplate/TableTemplate";
import SpeedDialTemplate from "../../../SpeedDialTemplate/SpeedDialTemplate";
import Popup from "../../../Popup/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "./ClassDetails.css";
import axios from "axios";
import { serverUrl } from "../../../../data/Data";

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const classID = params.id;

    const [subjectsList, setSubjectsList] = useState([]);
    const [sclassStudents, setSclassStudents] = useState([]);
    const [sclassDetails, setSclassDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState("1");
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const detailsResponse = await axios.get(`${serverUrl}/standard/${classID}`);
                setSclassDetails(detailsResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [classID]);

    const handleChange = (event, newValue) => setValue(newValue);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    return (
        <>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <Box className="class-details">
                    <TabContext value={value}>
                        <Box className="tab-header">
                            <TabList onChange={handleChange}>
                                <Tab label="Details" value="1" />
                                <Tab label="Subjects" value="2" />
                                <Tab label="Students" value="3" />
                                <Tab label="Teachers" value="4" />
                            </TabList>
                        </Box>
                        <Container className="tab-content">
                            <TabPanel value="1">
                                <Typography variant="h4" align="center">Class Details</Typography>
                                <Typography variant="h5">Class: {sclassDetails?.name}</Typography>
                                <Typography variant="h6">Subjects: {subjectsList.length}</Typography>
                                <Typography variant="h6">Students: {sclassStudents.length}</Typography>
                            </TabPanel>
                            <TabPanel value="2">
                                <TableTemplate columns={[{ id: 'name', label: 'Subject Name' }]} rows={subjectsList} />
                            </TabPanel>
                            <TabPanel value="3">
                                <TableTemplate columns={[{ id: 'name', label: 'Student Name' }]} rows={sclassStudents} />
                            </TabPanel>
                            <TabPanel value="4">
                                <Typography>Teachers Section</Typography>
                            </TabPanel>
                        </Container>
                    </TabContext>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;


// setLoading(true);
//                 // const detailsResponse = await fetch(`/api/class/details/${classID}`);
//                 const detailsResponse = await axios.get(`${serverUrl}/standard/${classID}`);
//                 // const subjectsResponse = await fetch(`/api/class/${classID}/subjects`);
//                 // const studentsResponse = await fetch(`/api/class/${classID}/students`);

//                 // if (!detailsResponse.ok || !subjectsResponse.ok || !studentsResponse.ok) {
//                 //     throw new Error("Failed to fetch data");
//                 // }

//                 setSclassDetails(detailsResponse.data);
//                 // setSubjectsList(await subjectsResponse.json());
//                 // setSclassStudents(await studentsResponse.json());