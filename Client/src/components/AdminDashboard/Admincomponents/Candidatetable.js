import * as React from 'react';
import '../CSS/Candidate.css'
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import axios from 'axios';
import CreateCandidate from './CreateCandidate'
import { BASE_URL } from '../../../helper';
import EditCandidateModal from './EditCandidateModal';

const columns = [
    { id: 'fullname', label: `FullName`, minWidth: 150 },
    { id: 'party', label: 'Party', minWidth: 120 },
    { id: 'bio', label: 'Bio', minWidth: 280 },
    { id: 'photo', label: 'Photo', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 200 },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
        fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CandidateTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [candidate, setCandidate] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteCandidate = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/deleteCandidate/${id}`);
            setCandidate(candidate.filter(cand => cand._id !== id));
        } catch (error) {
            console.error('Error deleting candidate', error);
        }
    };

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getCandidate`);
            setCandidate(response.data.candidate);
        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleEditClick = (candidate) => {
        setSelectedCandidate(candidate);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedCandidate(null);
    };

    return (
        <div className='Candidate'>
            <h5>Candidates</h5>
            <CreateCandidate onCandidateCreated={fetchCandidates} />
            <div className='Table'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell className='Table-Column-Heading'
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <StyledTableRow key={row._id} className='Table-Row'>
                                        <StyledTableCell className='Table-Row' component="th" scope="row">{row.fullName}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align='left'>{row.party}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align="left">{row.bio}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align="center">
                                            <img src={row.img} alt={`${row.fullName}'s profile`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                        </StyledTableCell>
                                        <StyledTableCell className='Table-Row' align="left">
                                            <span id='edit' className='Button-span'>
                                                <Button variant="contained" onClick={() => handleEditClick(row)}>Edit</Button>
                                            </span>
                                            <span id='delete' className='Button-span'>
                                                <Button variant="contained" onClick={() => deleteCandidate(row._id)}>Delete</Button>
                                            </span>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={candidate.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            {selectedCandidate && (
                <EditCandidateModal
                    open={editModalOpen}
                    handleClose={handleEditModalClose}
                    candidate={selectedCandidate}
                    onCandidateUpdated={fetchCandidates}
                />
            )}
        </div>
    );
}