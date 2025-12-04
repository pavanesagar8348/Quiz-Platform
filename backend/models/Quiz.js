// server/models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of strings for options
  correctAnswer: { type: String, required: true }, // The correct option
}, {
  timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;