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
        // Sort by most recent first
        const submissions = await Submission.find().sort({ timestamp: -1 });
        res.status(200).json({ success: true, data: submissions });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ success: false, message: 'Failed to retrieve submissions', error: error.message });
    }
});

// 4. Admin Timer Settings (Basic In-Memory Cache for now unless they want a DB Collection)
let adminSettings = { globalTimeLimit: 30 }; // Fallback

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
