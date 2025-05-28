const Candidate = require('../Model/Candidate');
const Voters = require('../Model/Voters');
const { uploadFile, deleteFile } = require('../Middleware/googledrive');
const fs = require('fs').promises;

exports.createCandidate = async (req, res) => {
    try {
        if (!req.files || !req.files.image || !req.files.symbol) {
            return res.status(400).json({ 
                success: false, 
                message: 'Both profile image and party symbol are required' 
            });
        }

        const photo1Path = req.files.image[0].path;
        const photo2Path = req.files.symbol[0].path;

        const photo1Name = req.files.image[0].originalname;
        const photo2Name = req.files.symbol[0].originalname;

        const folderId1 = '19zEIt8Uo3HepCJkAPhfinNH6Gk2kUAxQ';
        const folderId2 = '1wGLR2Unm09s4M7T1y9hl8RbW_u0u76HG';

        const photo1Url = await uploadFile(photo1Path, photo1Name, folderId1);
        const photo2Url = await uploadFile(photo2Path, photo2Name, folderId2);

        // Clean up local files after upload
        await fs.unlink(photo1Path);
        await fs.unlink(photo2Path);

        const candidate = new Candidate({
            ...req.body,
            img: photo1Url,
            symbol: photo2Url,
        });
        await candidate.save();
        return res.json({ success: true, candidate });
    }
    catch (e) {
        console.error('Error creating candidate:', e);
        return res.status(400).json({ success: false, message: e.message });
    }
}

exports.getCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.find();
        return res.json({ success: true, candidate });
    } catch (error) {
        console.error('Error fetching candidates:', error);
        return res.status(500).json({ success: false, message: 'Error fetching candidates' });
    }
}

exports.updateCandidate = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const updateData = { ...req.body };

        // Find existing candidate
        const existingCandidate = await Candidate.findById(candidateId);
        if (!existingCandidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        // Handle file uploads if new files are provided
        if (req.files) {
            if (req.files.img) {
                const photo1Path = req.files.img[0].path;
                const photo1Name = req.files.img[0].originalname;
                const folderId1 = '19zEIt8Uo3HepCJkAPhfinNH6Gk2kUAxQ';
                
                // Delete old image if it exists
                if (existingCandidate.img) {
                    await deleteFile(existingCandidate.img);
                }
                
                const photo1Url = await uploadFile(photo1Path, photo1Name, folderId1);
                updateData.img = photo1Url;
                
                // Clean up local file
                await fs.unlink(photo1Path);
            }
            
            if (req.files.symbol) {
                const photo2Path = req.files.symbol[0].path;
                const photo2Name = req.files.symbol[0].originalname;
                const folderId2 = '1wGLR2Unm09s4M7T1y9hl8RbW_u0u76HG';
                
                // Delete old symbol if it exists
                if (existingCandidate.symbol) {
                    await deleteFile(existingCandidate.symbol);
                }
                
                const photo2Url = await uploadFile(photo2Path, photo2Name, folderId2);
                updateData.symbol = photo2Url;
                
                // Clean up local file
                await fs.unlink(photo2Path);
            }
        }

        // Convert age to number if it exists
        if (updateData.age) {
            updateData.age = Number(updateData.age);
        }

        // Update the candidate
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            candidateId,
            updateData,
            { new: true, runValidators: true }
        );

        return res.json({
            success: true,
            candidate: updatedCandidate
        });
    } catch (err) {
        console.error('Error updating candidate:', err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

exports.deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        // Delete files from storage
        if (candidate.img) {
            await deleteFile(candidate.img);
        }
        if (candidate.symbol) {
            await deleteFile(candidate.symbol);
        }

        // Delete the candidate from database
        await Candidate.findByIdAndDelete(req.params.id);

        return res.json({
            success: true,
            message: 'Candidate deleted successfully'
        });
    } catch (e) {
        console.error('Error deleting candidate:', e);
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}