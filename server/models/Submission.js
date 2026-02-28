const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Client-generated UUID
    name: { type: String, required: true },
    grade: { type: String, required: true },
    phone: { type: String, required: true },
    branch: { type: String, required: true },
    band: { type: Number, required: true },
    answers: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} }, // Dynamic question IDs to answers
    scores: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },  // Calculated rubric band scores
    date: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
