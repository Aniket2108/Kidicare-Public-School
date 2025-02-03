import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Popup from '../../../Popup/Popup';
import { CircularProgress } from '@mui/material';
import './AddStudent.css'; // Import the CSS file
import { serverUrl } from '../../../../data/Data';
import axios from 'axios';

const AddStudent = ({ situation }) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const sclassesList = location.state?.classesList || []; // Access sclassesList from location state

    const [step, setStep] = useState(1);

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
    const [studentFirstName, setFirstName] = useState('');
    const [studentLastName, setLastName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [classId, setClassId] = useState('');
    const [studentDateOfBirth, setStudentDateOfBirth] = useState('');
    const [studentAadhaarCard, setStudentAadhaarCard] = useState('');
    const [studentBloodGroup, setStudentBloodGroup] = useState('');

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
    
    useEffect(() => {
        if(situation === 'Class'){
            const selectedClass = sclassesList.find(
                (classItem) => classItem.id == params.id
            ); 
            setClassName(selectedClass.name);
            setSclassName(selectedClass.id);
            setClassId(selectedClass.id);
        }
    },[]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
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
        studentFirstName, studentLastName , rollNum, password, sclassName, adminID, role, attendance
    };

    const submitHandler = async () => {
        if (sclassName === '') {
            setMessage('Please select a class');
            setShowPopup(true);
            return;
        }

        setLoader(true);

        const formData = {
            father: {
                firstName: fatherFirstName,
                lastName: fatherLastName,
                dateOfBirth: fatherDateOfBirth,
                mobileNumber: fatherMobileNumber,
                emailId: fatherEmail,
                aadhaarCard: fatherAadhaarCard,
                bloodGroup: fatherBloodGroup,
                occupation: fatherOccupation,
                occupationAddress: fatherOccupationAddress
            },
            mother: {
                firstName: motherFirstName,
                lastName: motherLastName,
                dateOfBirth: motherDateOfBirth,
                mobileNumber: motherMobileNumber,
                emailId: motherEmail,
                aadhaarCard: motherAadhaarCard,
                bloodGroup: motherBloodGroup,
                occupation: motherOccupation,
                occupationAddress: motherOccupationAddress
            },
            student: {
                firstName: studentFirstName,
                lastName: studentLastName,
                dateOfBirth: studentDateOfBirth,
                aadhaarCard: studentAadhaarCard,
                bloodGroup: studentBloodGroup,
                classId: classId
            }
        };

        console.log(formData);

        try{
            const response = await axios.post(
                `${serverUrl}/admin/student`,formData
            );
            if (response.status === 201) {
                setMessage("Student Added successfully!");
                setShowPopup(true);
                setTimeout(() => {
                  navigate('/');
                }, 2000);
              } 
              else if(response.status === 409){
                setMessage("Student Already Exists!");
                setShowPopup(true);
              }
              
              else {
                setMessage(`Unexpected response: ${response.status}`);
                setShowPopup(true);
              }
        }
        catch(error){
            setMessage("Network Error");
            setShowPopup(true);
        }
        finally{
            setLoader(false);
        }

        // Simulating API call for user registration
        // setTimeout(() => {
        //     setLoader(false);
        //     setMessage('Student added successfully!');
        //     setShowPopup(true);

        //     // Reset form fields after successful submission
        //     setFatherFirstName('');
        //     setFatherLastName('');
        //     setFatherDateOfBirth('');
        //     setFatherMobileNumber('');
        //     setFatherEmail('');
        //     setFatherAadhaarCard('');
        //     setFatherBloodGroup('');
        //     setFatherOccupation('');
        //     setFatherOccupationAddress('');
        //     setMotherFirstName('');
        //     setMotherLastName('');
        //     setMotherDateOfBirth('');
        //     setMotherMobileNumber('');
        //     setMotherEmail('');
        //     setMotherAadhaarCard('');
        //     setMotherBloodGroup('');
        //     setMotherOccupation('');
        //     setMotherOccupationAddress('');
        //     setFirstName('');
        //     setLastName('');
        //     setRollNum('');
        //     setPassword('');
        //     setClassName('');
        //     setSclassName('');

        //     // Navigate back after success
        //     setTimeout(() => navigate(-1), 1000);
        // }, 1500);
    };

    const isFatherValid = fatherFirstName && fatherLastName && fatherDateOfBirth && fatherMobileNumber &&
        fatherEmail && fatherAadhaarCard && fatherBloodGroup && fatherOccupation && fatherOccupationAddress;

    const isMotherValid = motherFirstName && motherLastName && motherDateOfBirth && motherMobileNumber &&
        motherAadhaarCard && motherBloodGroup && motherOccupation && motherOccupationAddress;

    const isStudentValid = studentFirstName && studentLastName && rollNum && password && sclassName;

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
                            <label>Student's First Name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter student's first name..."
                                value={studentFirstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            />
                            <label>Student's Last Name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter student's last name..."
                                value={studentLastName}
                                onChange={(event) => setLastName(event.target.value)}
                                required
                            />
                            <label>Student's Date of Birth</label>
                            <input
                                className="registerInput"
                                type="date"
                                value={studentDateOfBirth}
                                onChange={(event) => setStudentDateOfBirth(event.target.value)}
                                required
                            />
                            <label>Student's Aadhaar Card</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter Student's Aadhaar number..."
                                value={studentAadhaarCard}
                                onChange={(event) => setStudentAadhaarCard(event.target.value)}
                                required
                            />
                            <label>Student's Blood Group</label>
                            <select
                                className="registerInput"
                                value={studentBloodGroup}
                                onChange={(event) => setStudentBloodGroup(event.target.value)}
                                required
                            >
                                <option value="">Select Blood Group</option>
                                {bloodGroups.map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
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
                                <p>{className}</p>
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
