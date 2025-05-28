const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const voterRoutes = require('./Routes/Voters');
const candidateRoutes = require('./Routes/Candidate');
const votesRoute = require('./Routes/Votes');
const adminRoute = require('./Routes/Admin');
const loginRoute = require('./Routes/login');
const bodyParser = require('body-parser');
const Voters = require('./Model/Voters');
const multer = require('multer');
const DB ="mongodb+srv://mahidipsinh:mahidipsinh@cluster0.bc01nef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Email configuration
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

// Test email configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // Adjust the origin as per your frontend server
//     credentials: true
//   }));

dotenv.config();

// CONNECTING THE DATABASE
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log('database is connected');
}).catch((err) => {
    console.log(err);
});

app.use('/candidateimage', express.static('publicUploads/CandidatePhotos'));
app.use('/voterimage', express.static('publicUploads/VoterPhotos'));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Send JSON responses


app.use(voterRoutes);
app.use(candidateRoutes);
app.use(votesRoute);
app.use(adminRoute);
app.use(loginRoute);


const port = 5000;
app.listen(port, () => console.log(`server is running at port ${port}`));