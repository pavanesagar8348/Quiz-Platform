// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes'); // <-- IMPORT NEW ROUTE

// Load environment variables
dotenv.config();
// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes); // <-- USE NEW ROUTE

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));