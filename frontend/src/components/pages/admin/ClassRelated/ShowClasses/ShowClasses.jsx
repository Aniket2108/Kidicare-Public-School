import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';
import { BlueButton, GreenButton } from '../../../buttonStyles';
import TableTemplate from '../../../TableTemplate/TableTemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import SpeedDialTemplate from '../../../SpeedDialTemplate/SpeedDialTemplate';
import Popup from '../../../Popup/Popup';
import { serverUrl } from "../../../../data/Data";

import '../ShowClasses/ShowClasses.css';

const ShowClasses = () => {
  const navigate = useNavigate();

  // Define adminID here (or fetch it from your context or props)
  const adminID = "admin-id"; // Replace this with the actual logic to get adminID

  const [sclassesList, setSclassesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all classes from the API on component load
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/standard/`);
      if (response.ok) {
        const data = await response.json();
        setSclassesList(data);
      } else {
        setError("Failed to fetch classes.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Simulated delete function (could be updated to a real delete request)
  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  // Use effect to fetch classes when the page loads
  useEffect(() => {
    fetchClasses();
  }, []);

  // Define columns for the table
  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  // Map through classes and create rows for the table
  const sclassRows = sclassesList.map((sclass) => ({
    name: sclass.name,
    id: sclass.id,
  }));

  // Button actions for each class
  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { 
        icon: <PersonAddAlt1Icon />, 
        name: 'Add Student', 
        action: () => navigate("/Admin/class/addstudents/" + row.id, { state: { classesList: sclassesList } }) // Pass sclassesList as state
      },
    ];
    return (
      <div className="button-container">
         <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton variant="contained" onClick={() => navigate("/Admin/classes/class/" + row.id)}>
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </div>
    );
  };

  // Menu for additional actions (Add Students, Add Subjects)
  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // Define the Paper style here
    const menuStyle = {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    };

    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: menuStyle,  // Use the defined style here
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action) => (
            <MenuItem onClick={action.action} key={action.name}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  // Speed dial for adding new class or deleting all classes
  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {sclassesList.length > 0 ? (
            <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
          ) : (
            <div>No classes available</div>
          )}
          <SpeedDialTemplate actions={actions} />
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;
