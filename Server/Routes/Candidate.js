/**********************************************************************************************/
//VOTERS ROUTES

const Candidate = require('../Model/Candidate');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createCandidate, getCandidate, updateCandidate, deleteCandidate } = require('../Controller/Candidate');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

/**********************************************************************************************/
// POST METHOD
router.post('/createCandidate', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'symbol', maxCount: 1 }
]), createCandidate);

/**********************************************************************************************/
router.get('/getCandidate', getCandidate);
// router.get('/task/:id',getTaskbyID);

/**********************************************************************************************/
// UPDATE DATA
router.patch('/updateCandidate/:id', upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'symbol', maxCount: 1 }
]), updateCandidate);

router.delete('/deleteCandidate/:id', deleteCandidate);
/**********************************************************************************************/
// DELETE METHOD
// router.delete('/task/:id',deleteTask);
/**********************************************************************************************/
module.exports = router;