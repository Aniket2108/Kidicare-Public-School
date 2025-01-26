import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import styles from '../Popup/Popup.css';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const vertical = "top";
    const horizontal = "right";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
    };

    return (
        <Snackbar 
            open={showPopup} 
            autoHideDuration={2000} 
            onClose={handleClose} 
            anchorOrigin={{ vertical, horizontal }} 
            key={vertical + horizontal}
            className={styles.snackbar}
        >
            {message === "Done Successfully" ? (
                <Alert onClose={handleClose} severity="success" className={styles.alert}>
                    {message}
                </Alert>
            ) : (
                <Alert onClose={handleClose} severity="error" className={styles.alert}>
                    {message}
                </Alert>
            )}
        </Snackbar>
    );
};

export default Popup;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});