import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';
import '../TableViewTemplate/TableViewTemplate.css'; 

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <div className="table-container">
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`table-cell ${column.align}`}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <tr className="table-row" key={row.id}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <td key={index} className={`table-cell ${column.align}`}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 5));
                    setPage(0);
                }}
            />
        </div>
    );
};

export default TableViewTemplate;
