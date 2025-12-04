// client/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- PLACEHOLDER LOGIN LOGIC (Must use exact credentials) ---
    if (email === 'test@user.com' && password === 'password') {
      // Success!
      // In a full app, you would save the JWT token here.
      console.log('Login successful (Placeholder)');
      navigate('/quiz');
    } else {
      setError('Invalid credentials. Please use: test@user.com / password');
    }
  };

  return (
    // Applied attractive card styling
    <div className="login-container card-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="test@user.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        {/* Applied attractive button styling */}
        <button type="submit" className="login-button primary-button">Login</button>
      </form>
      <p style={{marginTop: '20px', fontSize: '0.9em'}}>
          Don't have an account? <Link to="/register" style={{color: '#ff6b6b'}}>Register Here</Link>
      </p>
    </div>
  );
};

export default Login;