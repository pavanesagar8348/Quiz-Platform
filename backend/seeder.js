// server/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

// We will handle the DB connection manually here to ensure clean exit
const connectAndImport = async () => {
  try {
    // Attempt connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connection Established for Seeder.');

    // 1. Clear existing data
    await Quiz.deleteMany();
    
    // 2. Insert the new questions (using the 20 questions array from earlier)
    // NOTE: Ensure your quizQuestions array is defined ABOVE this function call!
    await Quiz.insertMany(quizQuestions);
    
    console.log('✅ Data Imported Successfully!');
    
    // Close connection and exit
    mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    
    // Close connection and exit with failure code
    mongoose.connection.close();
    process.exit(1);
  }
};

// Ensure your 20 question array is defined here, before calling connectAndImport()
const quizQuestions = [
  // ... (Insert your 20 questions array here) ...
  {
    question: "What does the 'E' stand for in the MERN stack?",
    options: ["Ember.js", "Express.js", "Electron.js", "EJS"],
    correctAnswer: "Express.js"
  },
  // ... (18 more questions) ...
  {
    question: "In Node.js, how do you include external modules/libraries?",
    options: ["import 'module'", "include 'module'", "require('module')", "load 'module'"],
    correctAnswer: "require('module')"
  }
];

connectAndImport();