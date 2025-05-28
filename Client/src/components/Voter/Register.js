import { sendVoterRegistrationEmail } from '../../utils/emailService';
// ... other imports ...

const Register = () => {
  // ... existing state and other code ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your existing registration logic
      const response = await axios.post('/api/voters/createVoter', formData);
      
      if (response.data.success) {
        // Send welcome email
        await sendVoterRegistrationEmail(
          response.data.voter.name,
          response.data.voter.email
        );
        
        toast.success('Registration successful! Welcome email sent.');
        // ... rest of your success handling
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  // ... rest of your component code ...
}; 