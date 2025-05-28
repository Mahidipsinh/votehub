/**********************************************************************************************/
//VOTERS ROUTES

const Voters = require('../Model/Voters');
const express = require('express');
const router = express.Router();
const { createVoter, getVoters, getVoterbyID, updateVoter, deleteVoter } = require('../Controller/Voters');
const {login, logout} = require('../Controller/login');
const multer = require('multer');
const { checkLogin, redirectLoggedIn } = require('../Middleware/checkLogin');
const upload = multer({ dest: 'uploads/' });
const { sendEmail, emailTemplates } = require('../utils/emailService');


/**********************************************************************************************/
// POST METHOD
router.post('/createVoter', upload.single('image'), createVoter);

/**********************************************************************************************/
router.get('/getVoter', getVoters);

router.post('/login',login);

router.post('/logout',logout);

router.get('/getVoterbyID/:id', getVoterbyID);


/**********************************************************************************************/
//UPDATE DATA
router.patch('/updateVoter/:id',updateVoter);
/**********************************************************************************************/
// DELETE METHOD
router.delete('/deleteVoter/:id',deleteVoter);

// Voter registration route
router.post('/register', async (req, res) => {
  try {
    // ... existing registration logic ...

    // After successful registration, send welcome email
    const emailTemplate = emailTemplates.voterRegistration(voter.name);
    await sendEmail(
      voter.email,
      emailTemplate.subject,
      'Welcome to VoteHub',
      emailTemplate.html
    );

    res.status(201).json({
      success: true,
      message: 'Voter registered successfully',
      voter
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering voter',
      error: error.message
    });
  }
});

/**********************************************************************************************/
module.exports = router;
