// client/src/components/Quiz.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Retrieve the API URL from the environment variable (client/.env)
const API_URL = import.meta.env.VITE_API_URL;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Fetch Quiz Questions from the Backend
    axios.get(API_URL)
      .then(response => {
        setQuestions(response.data);
        // Initialize userAnswers array: [{ _id: questionId, selectedAnswer: null }]
        setUserAnswers(response.data.map(q => ({ _id: q._id, selectedAnswer: null })));
        setLoading(false);
      })
      .catch(err => {
        // This is the error message shown if the backend is down
        console.error("Failed to fetch quizzes:", err);
        setError('Error: Failed to fetch quizzes. Please check the backend server status.');
        setLoading(false);
      });
  }, []);

  const handleOptionSelect = (option) => {
    // Update the answer for the current question
    const newAnswers = [...userAnswers];
    // NOTE: We only update the 'selectedAnswer' property for the current question index
    newAnswers[currentQuestionIndex].selectedAnswer = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Filter out unanswered questions before submitting
    const finalAnswers = userAnswers.filter(a => a.selectedAnswer !== null);

    // 2. Submit Answers to the Backend for Scoring
    axios.post(`${API_URL}/submit`, { answers: finalAnswers })
      .then(response => {
        // Store results in session storage to pass to the Results page
        sessionStorage.setItem('quizResults', JSON.stringify(response.data));
        navigate('/results');
      })
      .catch(err => {
        setError('Failed to submit quiz. Please try again.');
        console.error(err);
      });
  };

  // --- RENDERING LOGIC ---
  if (loading) {
    return (
      <div className="quiz-container card-container">
        <h2>Loading Quiz...</h2>
        <p>Attempting to connect to the server and fetch questions.</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quiz-container card-container">
        <h2>Connection Error</h2>
        <p style={{color: '#dc3545', fontWeight: 'bold'}}>{error}</p>
        <p>Ensure the backend is running (`npm run dev` in the backend folder).</p>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="quiz-container card-container">
        <h2>No Quizzes Available</h2>
        <p>The database returned no questions. Please run `npm run data:import` in the backend folder.</p>
      </div>
    );
  }

  // Display the current question and its options
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex].selectedAnswer;

  return (
    // Apply the attractive card styling
    <div className="quiz-container card-container">
      <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <div className="question-text" style={{fontSize: '1.2em', margin: '20px 0', fontWeight: '500'}}>
          {currentQuestion.question}
      </div>
      
      <div className="options-list">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            // Add 'selected' class for visual feedback
            className={`option-button ${currentAnswer === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} style={{backgroundColor: '#e9ecef'}}>
          Previous
        </button>
        
        {/* If not the last question, show Next button */}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} className="primary-button">
            Next
          </button>
        ) : (
          /* If it is the last question, show Submit button */
          <button onClick={handleSubmit} className="submit-button primary-button">
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;