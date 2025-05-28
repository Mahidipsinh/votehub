import "../../../Sign/SignUtils/CSS/Sign.css";
import signupimage from "../../../Sign/SignUtils/images/signup-image.jpg"
import { Link, useNavigate } from 'react-router-dom';
import "../../../Sign/SignUtils/CSS/style.css.map"
import UserNavbar from "../../../Navbar/UserNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        voterid: '',
        phone: '',
        email: '',
        image: null
    });

    useEffect(() => {
        const voterid = Cookies.get('myCookie');
        if (!voterid) {
            navigate('/Login');
            return;
        }

        // Fetch voter data
        axios.get(`${BASE_URL}/getVoterbyID/${voterid}`)
            .then((response) => {
                const voter = response.data.voter;
                setFormData({
                    firstName: voter.firstName || '',
                    lastName: voter.lastName || '',
                    dob: voter.dob || '',
                    voterid: voter.voterid || '',
                    phone: voter.phone || '',
                    email: voter.email || '',
                    image: voter.image || null
                });
            })
            .catch(error => {
                console.error('Error fetching voter data:', error);
                toast.error('Failed to load profile data');
            });
    }, [navigate]);

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
            const voterid = Cookies.get('myCookie');
            if (!voterid) {
                toast.error('Session expired. Please login again.');
                navigate('/Login');
                return;
            }

            const formDataToSend = new FormData();
            for (const key in formData) {
                if (key === 'voterid' || key === 'phone') {
                    formDataToSend.append(key, Number(formData[key]));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            const response = await axios.patch(`${BASE_URL}/updateVoter/${voterid}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Profile updated successfully');
                setTimeout(() => {
                    navigate('/User');
                }, 2000);
            } else {
                toast.error(response.data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <UserNavbar />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Edit Your Details</h2>
                            <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
                                <ToastContainer />
                                <div className="form-group">
                                    <label htmlFor="firstName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        id="firstName" 
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Your First Name" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        id="lastName" 
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Your Last Name" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob"><i className="zmdi zmdi-calendar-account material-icons-name"></i></label>
                                    <input 
                                        type="date" 
                                        name="dob" 
                                        id="dob" 
                                        value={formData.dob}
                                        onChange={handleChange}
                                        placeholder="Your Date of Birth" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="voterid"><i className="zmdi zmdi-file-text material-icons-name"></i></label>
                                    <input 
                                        type="number" 
                                        name="voterid" 
                                        id="voterid" 
                                        value={formData.voterid}
                                        onChange={handleChange}
                                        placeholder="Your Voter ID" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone"><i className="zmdi zmdi-local-phone material-icons-name"></i></label>
                                    <input 
                                        type="number" 
                                        name="phone" 
                                        id="phone" 
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your Phone Number" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input 
                                        type="file" 
                                        name="image" 
                                        id="image" 
                                        onChange={handleFileChange}
                                        placeholder="Upload Your Photo" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email" 
                                        required 
                                    />
                                </div>
                                <div className="form-group form-button">
                                    <button type="submit" disabled={loading}>
                                        {loading ? <div className="spinner"></div> : 'Update Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={signupimage} alt="Sign up illustration" /></figure>
                            <Link to='/User' className="signup-image-link">Back to Profile</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditProfile;