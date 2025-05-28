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

const EditCandidateModal = ({ open, handleClose, candidate, onCandidateUpdated }) => {
    const [formData, setFormData] = React.useState({
        fullName: '',
        age: '',
        party: '',
        bio: '',
        img: null,
        symbol: null
    });
    const [loading, setLoading] = React.useState(false);
    const [currentImage, setCurrentImage] = React.useState('');
    const [currentSymbol, setCurrentSymbol] = React.useState('');

    React.useEffect(() => {
        if (candidate) {
            setFormData({
                fullName: candidate.fullName || '',
                age: candidate.age || '',
                party: candidate.party || '',
                bio: candidate.bio || '',
                img: null,
                symbol: null
            });
            setCurrentImage(candidate.img || '');
            setCurrentSymbol(candidate.symbol || '');
        }
    }, [candidate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            
            // Add all form fields to FormData
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('age', formData.age);
            formDataToSend.append('party', formData.party);
            formDataToSend.append('bio', formData.bio);

            // Only append files if they were changed
            if (formData.img) {
                formDataToSend.append('img', formData.img);
            }
            if (formData.symbol) {
                formDataToSend.append('symbol', formData.symbol);
            }

            console.log('Sending update request for candidate:', candidate._id);
            const response = await axios.patch(
                `${BASE_URL}/updateCandidate/${candidate._id}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                toast.success('Candidate updated successfully');
                onCandidateUpdated();
                handleClose();
            } else {
                toast.error(response.data.message || 'Failed to update candidate');
            }
        } catch (error) {
            console.error('Error updating candidate:', error);
            toast.error(error.response?.data?.message || 'Failed to update candidate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-candidate-modal"
        >
            <Box sx={style}>
                <ToastContainer />
                <h2 id="edit-candidate-modal" style={{ marginBottom: '20px' }}>Edit Candidate Details</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="18"
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Party</label>
                        <input
                            type="text"
                            name="party"
                            value={formData.party}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Profile Picture</label>
                        {currentImage && (
                            <div style={{ marginBottom: '10px' }}>
                                <img 
                                    src={currentImage} 
                                    alt="Current profile" 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} 
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            name="img"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Party Symbol</label>
                        {currentSymbol && (
                            <div style={{ marginBottom: '10px' }}>
                                <img 
                                    src={currentSymbol} 
                                    alt="Current party symbol" 
                                    style={{ width: '100px', height: '100px', objectFit: 'contain' }} 
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            name="symbol"
                            onChange={handleFileChange}
                            accept="image/*"
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

export default EditCandidateModal; 