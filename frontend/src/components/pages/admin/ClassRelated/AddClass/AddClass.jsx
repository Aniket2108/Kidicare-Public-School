import React, { useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../../../buttonStyles";
import Popup from "../../../Popup/Popup";
import Classroom from "../../../../../assets/classroom.png";
import styles from "../AddClass/AddClass.css";
import axios from "axios";
import { serverUrl } from "../../../../data/Data";

const AddClass = () => {
  const [sclassName, setSclassName] = useState({
    name: ""
  });
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      // Send POST request to the backend
      const response = await axios.post(
        `${serverUrl}/admin/class`,
        sclassName
      );
  
      console.log(response);
  
      if (response.status === 201) {
        setMessage("Class created successfully!");
        setShowPopup(true);
        setSclassName("");
        setTimeout(() => {
          navigate('/Admin/classes');
        }, 2000);
      } else {
        // You can also check for other status codes if needed
        setMessage(`Unexpected response: ${response.status}`);
        setShowPopup(true);
      }
    } catch (error) {
      // Handle specific error status codes, like 409
      if (error.response && error.response.status === 409) {
        setMessage("Class Name already exists!");
      } else {
        // Handle generic errors
        setMessage(`Error: ${error.message}`);
      }
      setShowPopup(true);
      setSclassName("");  // Optionally clear input field on error
    } finally {
      setLoader(false);  // Stop loader
    }
  };

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.box}>
          <Stack sx={{ alignItems: "center", mb: 3 }}>
            <img src={Classroom} alt="classroom" className={styles.image} />
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Create a class"
                variant="outlined"
                value={sclassName.name}
                onChange={(event) => setSclassName({ name: event.target.value })}
                required
                fullWidth
              />
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
              </BlueButton>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddClass;
