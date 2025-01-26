import React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import '../SpeedDialTemplate/SpeedDialTemplate'; 

const SpeedDialTemplate = ({ actions }) => {
    return (
        <div className="speed-dial-container">
            <SpeedDial
                ariaLabel="SpeedDial playground example"
                icon={<TuneIcon />}
                direction="left"
                className="speed-dial"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                        className="speed-dial-action"
                    />
                ))}
            </SpeedDial>
        </div>
    );
}

export default SpeedDialTemplate;
