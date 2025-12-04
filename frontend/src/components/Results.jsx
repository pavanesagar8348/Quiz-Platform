// client/src/components/Results.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Results = () => {
  const resultsData = JSON.parse(sessionStorage.getItem('quizResults'));

  if (!resultsData) {
    return (
      <div className="results-container">
        <h2>No Results Found</h2>
        <p>Please take the quiz first to view your results.</p>
        <Link to="/quiz">Go to Quiz</Link>
      </div>
    );
  }

  const { score, totalQuestions, results } = resultsData;
  const percentage = ((score / totalQuestions) * 100).toFixed(1);

  return (
    <div className="results-container">
      <h2>Quiz Completed!</h2>
      <p className="final-score">
        Your Score: **{score} out of {totalQuestions}** ({percentage}%)
      </p>

      <div className="details-table">
        <h3>Detailed Breakdown</h3>
        {results.map((r, index) => (
          <div key={index} className={`result-item ${r.isCorrect ? 'correct' : 'incorrect'}`}>
            <p><strong>Q{index + 1}:</strong> {r.question}</p>
            <p>Your Answer: **{r.selectedAnswer}**</p>
            <p>Correct Answer: **{r.correctAnswer}**</p>
          </div>
        ))}
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Results;