// server/routes/quizRoutes.js
const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

// GET /api/quizzes - Get all quiz questions
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('-correctAnswer'); // Don't send the answer!
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/quizzes/submit - Submit answers and calculate score
router.post('/submit', async (req, res) => {
  const userAnswers = req.body.answers; // Expects an array like [{ _id: '...', selectedAnswer: '...' }]

  try {
    let score = 0;
    const quizQuestions = await Quiz.find();
    const results = [];

    quizQuestions.forEach(q => {
      const userAnswer = userAnswers.find(a => a._id === q._id.toString());
      const isCorrect = userAnswer && userAnswer.selectedAnswer === q.correctAnswer;
      if (isCorrect) {
        score++;
      }
      results.push({
        question: q.question,
        correctAnswer: q.correctAnswer,
        selectedAnswer: userAnswer ? userAnswer.selectedAnswer : 'Not Answered',
        isCorrect: isCorrect
      });
    });

    res.json({ score, totalQuestions: quizQuestions.length, results });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ADMIN: POST /api/quizzes/add - Add a new quiz question (For testing only, secure this with auth later)
router.post('/add', async (req, res) => {
  try {
    const newQuestion = new Quiz(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;