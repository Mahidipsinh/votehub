import emailjs from 'emailjs-com';

// EmailJS configuration
const SERVICE_ID = 'service_b8vu9hs';
const USER_ID = 'CNtFOvUybjnR3S2K0';

// Email templates
const emailTemplates = {
  voterRegistration: (voterName, voterEmail) => ({
    template_id: 'template_z8f3xfa',
    template_params: {
      to_name: voterName,
      to_email: voterEmail,
      message: `Welcome to VoteHub, ${voterName}! Your registration has been successful. You can now login and participate in the voting process.`,
      subject: 'Welcome to VoteHub - Registration Successful'
    }
  }),

  voteConfirmation: (voterName, voterEmail, candidateName) => ({
    template_id: 'template_z8f3xfa',
    template_params: {
      to_name: voterName,
      to_email: voterEmail,
      message: `Thank you for voting, ${voterName}! Your vote for ${candidateName} has been successfully recorded.`,
      subject: 'VoteHub - Vote Confirmation'
    }
  }),

  passwordReset: (voterName, voterEmail, resetLink) => ({
    template_id: 'template_z8f3xfa',
    template_params: {
      to_name: voterName,
      to_email: voterEmail,
      message: `Click the following link to reset your password: ${resetLink}. This link will expire in 1 hour.`,
      subject: 'VoteHub - Password Reset Request'
    }
  })
};

// Send email function
const sendEmail = async (template) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      template.template_id,
      template.template_params,
      USER_ID
    );
    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

// Export functions for specific email types
export const sendVoterRegistrationEmail = (voterName, voterEmail) => {
  const template = emailTemplates.voterRegistration(voterName, voterEmail);
  return sendEmail(template);
};

export const sendVoteConfirmationEmail = (voterName, voterEmail, candidateName) => {
  const template = emailTemplates.voteConfirmation(voterName, voterEmail, candidateName);
  return sendEmail(template);
};

export const sendPasswordResetEmail = (voterName, voterEmail, resetLink) => {
  const template = emailTemplates.passwordReset(voterName, voterEmail, resetLink);
  return sendEmail(template);
};

export default {
  sendVoterRegistrationEmail,
  sendVoteConfirmationEmail,
  sendPasswordResetEmail
}; 