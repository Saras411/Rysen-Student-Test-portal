require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Submission = require('./models/Submission');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
if (!process.env.MONGO_URI) {
    console.warn("⚠️ WARNING: No MONGO_URI provided in environment variables.");
    console.warn("The server will start, but database operations will fail.");
} else {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ Connected to MongoDB Database'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
}

// Routes

// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'active', message: 'RYSEN API is running perfectly.' });
});

// 2. Submit an Assessment
app.post('/api/submissions', async (req, res) => {
    try {
        const newSubmission = new Submission(req.body);
        const savedSubmission = await newSubmission.save();
        res.status(201).json({ success: true, data: savedSubmission });
    } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ success: false, message: 'Failed to save submission', error: error.message });
    }
});

// 3. Fetch all Submissions (Admin)
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ timestamp: -1 });
        res.status(200).json({ success: true, data: submissions });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ success: false, message: 'Failed to retrieve submissions', error: error.message });
    }
});

// 4. Delete a single Submission (Admin)
app.delete('/api/submissions/:id', async (req, res) => {
    try {
        const result = await Submission.findOneAndDelete({ id: req.params.id });
        if (!result) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }
        res.status(200).json({ success: true, message: 'Submission deleted' });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ success: false, message: 'Failed to delete submission', error: error.message });
    }
});

// 4b. Bulk Delete Submissions (Admin)
app.post('/api/submissions/bulk-delete', async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: 'No IDs provided' });
        }
        const result = await Submission.deleteMany({ id: { $in: ids } });
        res.status(200).json({ success: true, deleted: result.deletedCount });
    } catch (error) {
        console.error("Bulk Delete Error:", error);
        res.status(500).json({ success: false, message: 'Failed to bulk delete', error: error.message });
    }
});

// 5. Admin Timer Settings
let adminSettings = { globalTimeLimit: 30 };

app.get('/api/settings', (req, res) => {
    res.status(200).json({ success: true, data: adminSettings });
});

app.post('/api/settings', (req, res) => {
    const { globalTimeLimit } = req.body;
    if (globalTimeLimit) {
        adminSettings.globalTimeLimit = globalTimeLimit;
    }
    res.status(200).json({ success: true, data: adminSettings });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
