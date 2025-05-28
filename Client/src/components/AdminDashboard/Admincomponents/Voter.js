import * as React from 'react';
import { useState, useEffect } from 'react';
import '../CSS/Voter.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../../helper';
import { useNavigate } from 'react-router-dom';
import EditVoterModal from './EditVoterModal';

const columns = [
    { id: 'image', label: `Photo`, minWidth: 100 },
    { id: 'firstName', label: `FirstName`, minWidth: 120 },
    { id: 'lastName', label: 'LastName', minWidth: 120 },
    { id: 'age', label: 'Age', minWidth: 70 },
    { id: 'voterid', label: 'VoterID', minWidth: 120 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'phone', label: 'Phone', minWidth: 110 },
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

export default function Voter() {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [voters, setVoters] = useState([]);
    const [selectedVoter, setSelectedVoter] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteVoter = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/deleteVoter/${id}`);
            setVoters(voters.filter(voter => voter._id !== id));
        } catch (error) {
            console.error('Error deleting voter', error);
        }
    };

    const fetchVoters = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getVoter`);
            setVoters(response.data.voter);
        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    };

    useEffect(() => {
        fetchVoters();
    }, []);

    const handleEditClick = (voter) => {
        setSelectedVoter(voter);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedVoter(null);
    };

    return (
        <div className='Voters'>
            <h5>Voters</h5>
            <Button id='AddNew' variant="contained" onClick={() => navigate('/Signup')}>Add New Voter</Button>
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
                                {voters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <StyledTableRow key={row._id} className='Table-Row'>
                                        <StyledTableCell className='Table-Row' align='left'>
                                            <img src={row.image} alt={`${row.firstName} ${row.lastName}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                        </StyledTableCell>
                                        <StyledTableCell className='Table-Row' component="th" scope="row">{row.firstName}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align='left'>{row.lastName}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align='left'>{row.age}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align='left'>{row.voterid}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align="left">{row.email}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align="left">{row.phone}</StyledTableCell>
                                        <StyledTableCell className='Table-Row' align="left">
                                            <span id='edit' className='Button-span'>
                                                <Button variant="contained" onClick={() => handleEditClick(row)}>Edit</Button>
                                            </span>
                                            <span id='delete' className='Button-span'>
                                                <Button variant="contained" onClick={() => deleteVoter(row._id)}>Delete</Button>
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
                        count={voters.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            {selectedVoter && (
                <EditVoterModal
                    open={editModalOpen}
                    handleClose={handleEditModalClose}
                    voter={selectedVoter}
                    onVoterUpdated={fetchVoters}
                />
            )}
        </div>
    );
}