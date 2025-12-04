// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Login from './components/Login'; 
// import Register (will need to add this component later)

const Home = () => (
  // Applied attractive card styling
  <div className="card-container"> 
    <h1>Welcome to the MERN Quiz Platform!</h1>
    <p style={{color: '#666'}}>Test your knowledge with our exciting quiz.</p>
    {/* Applied attractive button styling */}
    <Link to="/login" className="start-button primary-button">Start Quiz</Link>
  </div>
);

function App() {
  return (
    <Router>
      <div id="app">
        <header>
          <Link to="/">Home</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> 
            
            {/* NOTE: You should create a /register route for the link above */}
            {/* <Route path="/register" element={<Register />} /> */}

            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;