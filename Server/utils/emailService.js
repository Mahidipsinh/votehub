const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Email templates
const emailTemplates = {
  voterRegistration: (voterName) => ({
    subject: 'Welcome to VoteHub - Registration Successful',
    html: `
      <h1>Welcome to VoteHub, ${voterName}!</h1>
      <p>Your voter registration has been successfully completed.</p>
      <p>You can now login to your account and participate in the voting process.</p>
      <p>Thank you for using VoteHub!</p>
    `
  }),
  
  voteConfirmation: (voterName, candidateName) => ({
    subject: 'VoteHub - Vote Confirmation',
    html: `
      <h1>Thank you for voting, ${voterName}!</h1>
      <p>Your vote for ${candidateName} has been successfully recorded.</p>
      <p>Thank you for participating in the democratic process!</p>
    `
  }),
  
  passwordReset: (resetLink) => ({
    subject: 'VoteHub - Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates
}; 