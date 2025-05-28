import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../../../helper';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const EditVoterModal = ({ open, handleClose, voter, onVoterUpdated }) => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        dob: '',
        voterid: '',
        phone: '',
        email: '',
        image: null
    });
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (voter) {
            setFormData({
                firstName: voter.firstName || '',
                lastName: voter.lastName || '',
                dob: voter.dob || '',
                voterid: voter.voterid || '',
                phone: voter.phone || '',
                email: voter.email || '',
                image: voter.image || null
            });
        }
    }, [voter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (key === 'voterid' || key === 'phone') {
                    formDataToSend.append(key, Number(formData[key]));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            const response = await axios.patch(`${BASE_URL}/updateVoter/${voter._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Voter updated successfully');
                onVoterUpdated();
                handleClose();
            } else {
                toast.error(response.data.message || 'Failed to update voter');
            }
        } catch (error) {
            console.error('Error updating voter:', error);
            toast.error(error.response?.data?.message || 'Failed to update voter');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-voter-modal"
        >
            <Box sx={style}>
                <ToastContainer />
                <h2 id="edit-voter-modal" style={{ marginBottom: '20px' }}>Edit Voter Details</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Voter ID</label>
                        <input
                            type="number"
                            name="voterid"
                            value={formData.voterid}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Profile Picture</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Button onClick={handleClose} variant="outlined">Cancel</Button>
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default EditVoterModal; 