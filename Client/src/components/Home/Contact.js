import React, { useState } from 'react';
import './CSS/contact.css'
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendingSuccess = (msg) => toast.success(msg, {
        className: "toast-message",
    });
    const sendingFailed = (msg) => toast.error(msg, {
        className: "toast-message",
    });

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };
        if (!name || !email || !message) {
            sendingFailed("Please Fill All the fields");
            setLoading(false);
            return;
        }
        try {
            emailjs.send('service_b8vu9hs', 'template_z8f3xfa', templateParams, 'CNtFOvUybjnR3S2K0')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    sendingSuccess('Your query has been sent successfully!');
                    setName('');
                    setEmail('');
                    setMessage('');
                }, (error) => {
                    console.error('FAILED...', error);
                    sendingFailed('There was an error sending your query. Please try again.');
                });
        } catch (error) {
            console.log(error)
            sendingFailed('There was an error sending your query. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form">
            <h2>Contact Us</h2>
            <ToastContainer />
            <form>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Enter Your Name'
                    />
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter Your Email'
                    />
                </div>
                <div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder='Enter Your Message'
                    />
                </div>
                <button onClick={handleSubmit} disabled={loading}>{loading ? <div className="spinner"></div> : 'Send'}</button>
            </form>
        </div>
    );
};

export default Contact;
