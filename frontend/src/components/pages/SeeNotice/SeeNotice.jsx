import React from 'react';
import { Paper } from '@mui/material';
import TableViewTemplate from '../TableViewTemplate/TableViewTemplate';
import '../SeeNotice/SeeNotice.css';

const SeeNotice = ({ noticesList = [], loading, response }) => {
    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    return (
        <div className="see-notice-container">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : response ? (
                <div className="no-notices">No Notices to Show Right Now</div>
            ) : (
                <>
                    <h3 className="notice-title">Notices</h3>
                    <Paper className="notice-paper">
                        {Array.isArray(noticesList) && noticesList.length > 0 ? (
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        ) : (
                            <div>No notices available</div>
                        )}
                    </Paper>
                </>
            )}
        </div>
    );
};

export default SeeNotice;
