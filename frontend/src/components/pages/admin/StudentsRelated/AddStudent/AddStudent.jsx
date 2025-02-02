import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../Popup/Popup';
import { CircularProgress } from '@mui/material';
import './AddStudent.css'; // Import the CSS file
import { serverUrl } from '../../../../data/Data';
import axios from 'axios';

const AddStudent = ({ situation }) => {
    const navigate = useNavigate();
    const params = useParams();

    const [step, setStep] = useState(3);

    // Father's details
    const [fatherFirstName, setFatherFirstName] = useState('');
    const [fatherLastName, setFatherLastName] = useState('');
    const [fatherDateOfBirth, setFatherDateOfBirth] = useState('');
    const [fatherMobileNumber, setFatherMobileNumber] = useState('');
    const [fatherEmail, setFatherEmail] = useState('');
    const [fatherAadhaarCard, setFatherAadhaarCard] = useState('');
    const [fatherBloodGroup, setFatherBloodGroup] = useState('');
    const [fatherOccupation, setFatherOccupation] = useState('');
    const [fatherOccupationAddress, setFatherOccupationAddress] = useState('');

    // Mother's details
    const [motherFirstName, setMotherFirstName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [motherDateOfBirth, setMotherDateOfBirth] = useState('');
    const [motherMobileNumber, setMotherMobileNumber] = useState('');
    const [motherEmail, setMotherEmail] = useState('');
    const [motherAadhaarCard, setMotherAadhaarCard] = useState('');
    const [motherBloodGroup, setMotherBloodGroup] = useState('');
    const [motherOccupation, setMotherOccupation] = useState('');
    const [motherOccupationAddress, setMotherOccupationAddress] = useState('');

    // Student's details
    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [sclassesList, setSclassesList] = useState([]);
    const [classId, setClassId] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const adminID = '123456'; // Simulating admin ID
    const role = 'Student';
    const attendance = [];

    useEffect(() => {
        if (situation === 'Class') {
            setClassId(params.id);
        }
    }, [params.id, situation]);

    // useEffect(() => {
    //     setLoader(true);
    //     axios
    //         .get(`${serverUrl}/standard/`)
    //         .then((response) => {
    //             console.log(response.data); // Log the response data
    //             setSclassesList(response.data);
    //             setLoader(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching class list:', error);
    //             setLoader(false);
    //         });
    // }, []);

    useEffect(() => {
        setLoader(true);
        const endpoint = situation === 'Class' ? `${serverUrl}/standard/${classId}` : `${serverUrl}/standard/`;
    
        axios
            .get(endpoint)
            .then((response) => {
                setSclassesList(Array.isArray(response.data) ? response.data : [response.data]); // Ensure it's an array
                setLoader(false);
            })
            .catch((error) => {
                console.error('Error fetching class list:', error);
                setLoader(false);
            });
    }, [situation, classId]);
    


    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.name === event.target.value // Updated to match the provided structure
            ); 
            setClassName(selectedClass.name);
            setSclassName(selectedClass.id);
        }
    };

    const bloodGroups = [
        'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'
    ];

    const fields = {
        fatherFirstName, fatherLastName, fatherDateOfBirth, fatherMobileNumber, fatherEmail,
        fatherAadhaarCard, fatherBloodGroup, fatherOccupation, fatherOccupationAddress,
        motherFirstName, motherLastName, motherDateOfBirth, motherMobileNumber, motherEmail,
        motherAadhaarCard, motherBloodGroup, motherOccupation, motherOccupationAddress,
        name, rollNum, password, sclassName, adminID, role, attendance
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === '') {
            setMessage('Please select a class');
            setShowPopup(true);
            return;
        }

        setLoader(true);

        // Simulating API call for user registration
        setTimeout(() => {
            setLoader(false);
            setMessage('Student added successfully!');
            setShowPopup(true);

            // Reset form fields after successful submission
            setFatherFirstName('');
            setFatherLastName('');
            setFatherDateOfBirth('');
            setFatherMobileNumber('');
            setFatherEmail('');
            setFatherAadhaarCard('');
            setFatherBloodGroup('');
            setFatherOccupation('');
            setFatherOccupationAddress('');
            setMotherFirstName('');
            setMotherLastName('');
            setMotherDateOfBirth('');
            setMotherMobileNumber('');
            setMotherEmail('');
            setMotherAadhaarCard('');
            setMotherBloodGroup('');
            setMotherOccupation('');
            setMotherOccupationAddress('');
            setName('');
            setRollNum('');
            setPassword('');
            setClassName('');
            setSclassName('');

            // Navigate back after success
            setTimeout(() => navigate(-1), 1000);
        }, 1500);
    };

    const isFatherValid = fatherFirstName && fatherLastName && fatherDateOfBirth && fatherMobileNumber &&
        fatherEmail && fatherAadhaarCard && fatherBloodGroup && fatherOccupation && fatherOccupationAddress;

    const isMotherValid = motherFirstName && motherLastName && motherDateOfBirth && motherMobileNumber &&
        motherAadhaarCard && motherBloodGroup && motherOccupation && motherOccupationAddress;

    const isStudentValid = name && rollNum && password && sclassName;

    // Step-wise validation
    const isValidStep = () => {
        if (step === 1) {
            return isFatherValid;
        } else if (step === 2) {
            // For Mother's details, fields with nullable values won't block the progression
            return (
                (motherFirstName && motherLastName && motherDateOfBirth && motherMobileNumber) ||  // Required fields
                !motherEmail && !motherAadhaarCard && !motherBloodGroup && !motherOccupation && !motherOccupationAddress
            );
        } else if (step === 3) {
            return isStudentValid;
        }
        return false;
    };

    return (
        <>
            <div className="register">
                <form className="registerForm" onSubmit={submitHandler}>
                    <span className="registerTitle">Add Student</span>

                    {step === 1 && (
                        <>
                            <h3>Father's Details</h3>
                            <label>Father's First Name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter father's first name..."
                                value={fatherFirstName}
                                onChange={(event) => setFatherFirstName(event.target.value)}
                                required
                            />
                            <label>Father's Last Name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter father's last name..."
                                value={fatherLastName}
                                onChange={(event) => setFatherLastName(event.target.value)}
                                required
                            />
                            <label>Father's Date of Birth</label>
                            <input
                                className="registerInput"
                                type="date"
                                value={fatherDateOfBirth}
                                onChange={(event) => setFatherDateOfBirth(event.target.value)}
                                required
                            />
                            <label>Father's Mobile Number</label>
                            <input
                                className="registerInput"
                                type="tel"
                                placeholder="Enter father's mobile number..."
                                value={fatherMobileNumber}
                                onChange={(event) => setFatherMobileNumber(event.target.value)}
                                required
                            />
                            <label>Father's Email</label>
                            <input
                                className="registerInput"
                                type="email"
                                placeholder="Enter father's email..."
                                value={fatherEmail}
                                onChange={(event) => setFatherEmail(event.target.value)}
                                required
                            />
                            <label>Father's Aadhaar Card</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter father's Aadhaar number..."
                                value={fatherAadhaarCard}
                                onChange={(event) => setFatherAadhaarCard(event.target.value)}
                                required
                            />
                            <label>Father's Blood Group</label>
                            <select
                                className="registerInput"
                                value={fatherBloodGroup}
                                onChange={(event) => setFatherBloodGroup(event.target.value)}
                                required
                            >
                                <option value="">Select Blood Group</option>
                                {bloodGroups.map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
                            <label>Father's Occupation</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter father's occupation..."
                                value={fatherOccupation}
                                onChange={(event) => setFatherOccupation(event.target.value)}
                                required
                            />
                            <label>Father's Occupation Address</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter father's occupation address..."
                                value={fatherOccupationAddress}
                                onChange={(event) => setFatherOccupationAddress(event.target.value)}
                                required
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h3>Mother's Details</h3>
                            <label>Mother's First Name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter mother's first name..."
                                value={motherFirstName}
                                onChange={(event) => setMotherFirstName(event.target.value)}
                                required
                            />
                            <label>Mother's Last Name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter mother's last name..."
                                value={motherLastName}
                                onChange={(event) => setMotherLastName(event.target.value)}
                                required
                            />
                            <label>Mother's Date of Birth</label>
                            <input
                                className="registerInput"
                                type="date"
                                value={motherDateOfBirth}
                                onChange={(event) => setMotherDateOfBirth(event.target.value)}
                                required
                            />
                            <label>Mother's Mobile Number</label>
                            <input
                                className="registerInput"
                                type="tel"
                                placeholder="Enter mother's mobile number..."
                                value={motherMobileNumber}
                                onChange={(event) => setMotherMobileNumber(event.target.value)}
                                required
                            />
                            <label>Mother's Email</label>
                            <input
                                className="registerInput"
                                type="email"
                                placeholder="Enter mother's email..."
                                value={motherEmail}
                                onChange={(event) => setMotherEmail(event.target.value)}
                            />
                            <label>Mother's Aadhaar Card</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter mother's Aadhaar number..."
                                value={motherAadhaarCard}
                                onChange={(event) => setMotherAadhaarCard(event.target.value)}
                            />
                            <label>Mother's Blood Group</label>
                            <select
                                className="registerInput"
                                value={motherBloodGroup}
                                onChange={(event) => setMotherBloodGroup(event.target.value)}
                            >
                                <option value="">Select Blood Group</option>
                                {bloodGroups.map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
                            <label>Mother's Occupation</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter mother's occupation..."
                                value={motherOccupation}
                                onChange={(event) => setMotherOccupation(event.target.value)}
                            />
                            <label>Mother's Occupation Address</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter mother's occupation address..."
                                value={motherOccupationAddress}
                                onChange={(event) => setMotherOccupationAddress(event.target.value)}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h3>Student's Details</h3>
                            <label>Student Name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter student's name..."
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                            <label>Roll Number</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter roll number..."
                                value={rollNum}
                                onChange={(event) => setRollNum(event.target.value)}
                                required
                            />
                            <label>Password</label>
                            <input
                                className="registerInput"
                                type="password"
                                placeholder="Enter password..."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            <label>Class</label>
                            {situation === 'Class' ? (
                                <p>{sclassesList.find((classItem) => classItem.id === classId)?.name}</p>
                            ) : (
                                <select
                                    className="registerInput"
                                    value={sclassName}
                                    onChange={changeHandler}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    {sclassesList.map((Item, index) => (
                                        <option key={index} value={Item._id}>
                                            {Item.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </>
                    )}

                    <div className="buttons">
                        <button
                            type="button"
                            className="registerButton previousButton"
                            disabled={step === 1}
                            onClick={() => setStep(step - 1)}
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            className="registerButton nextButton"
                            disabled={!isValidStep()}
                            onClick={() => {
                                if (step < 3) {
                                    setStep(step + 1);
                                } else {
                                    submitHandler();
                                }
                            }}
                        >
                            {step < 3 ? 'Next' : (loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student')}
                        </button>
                    </div>
                </form>
            </div>

            <Popup
                open={showPopup}
                onClose={() => setShowPopup(false)}
                message={message}
            />
        </>
    );
};

export default AddStudent;
