import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Popup from '../../../Popup/Popup';
import './AddTeacher.css';
import { serverUrl } from "../../../../data/Data";
import axios from 'axios';

const AddTeacher = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        `${serverUrl}/admin/teacher`, formData
      )
      if (response.status === 201) {
        setMessage("Teacher Added successfully!");
        setShowPopup(true);
        setTimeout(() => {
          navigate('/Admin/teachers');
        }, 2000);
      } else {
        setMessage(`Unexpected response: ${response.status}`);
        setShowPopup(true);
      }
    } catch (err) {
      setMessage("Network Error");
      setShowPopup(true);
    }
    setLoader(false);
  };

  return (
    <div className="add-teacher">
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Teacher</span>
          <br />
          <label>First Name</label>
          <input
            className="registerInput"
            type="text"
            name="firstName"
            placeholder="Enter first name..."
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="first-name"
            required
          />
          <label>Last Name</label>
          <input
            className="registerInput"
            type="text"
            name="lastName"
            placeholder="Enter last name..."
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="last-name"
            required
          />
          <label>Date of Birth</label>
          <input
            className="registerInput"
            type="date"
            name="dateOfBirth"
            placeholder="Enter date of birth..."
            value={formData.dateOfBirth}
            onChange={handleChange}
            autoComplete="DOB"
            required
          />
          <label>Mobile Number</label>
          <input
            className="registerInput"
            type="tel"
            name="mobileNumber"
            placeholder="Enter mobile number..."
            value={formData.mobileNumber}
            onChange={handleChange}
            autoComplete="mobile"
            required
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            name="emailId"
            placeholder="Enter email..."
            value={formData.emailId}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <label>Password</label>
          <TextField
            className="registerInput"
            type={togglePassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter password..."
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setTogglePassword(!togglePassword)} edge="end">
                    {togglePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default AddTeacher;
