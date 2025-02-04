import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, IconButton } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlueButton, BlackButton } from '../../../buttonStyles';

const StudentButtonHaver = ({ row, deleteHandler }) => {
    const navigate = useNavigate();
    const options = ['Take Attendance', 'Provide Marks'];

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = () => {
        if (selectedIndex === 0) {
            navigate("/Admin/students/student/attendance/" + row.id);
        } else if (selectedIndex === 1) {
            navigate("/Admin/students/student/marks/" + row.id);
        }
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={() => deleteHandler(row.id)}>
                <PersonRemoveIcon color="error" />
            </IconButton>
            <BlueButton variant="contained" onClick={() => navigate("/Admin/students/student/" + row.id)}>
                View
            </BlueButton>
            <React.Fragment>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <BlackButton
                        size="small"
                        onClick={handleToggle}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </BlackButton>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        </>
    );
};

export default StudentButtonHaver;
