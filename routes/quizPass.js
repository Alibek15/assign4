const express = require('express');
const router = express.Router();
const Quiz = require("../model/quiz");

router.get('/quiz', (req, res) => {
    // The language can be determined based on the user's preferences, a URL parameter, etc.
    const language = req.query.language || 'en'; // Default to 'en' if no language is specified
    
    res.render('quiz', { language: language });
  });

router.post('/saveQuizResults', async (req, res) => {
    try {
      const { selectedAnswers, score } = req.body;
  
      // Create a new Quiz document
      const quizResult = new Quiz({
        endTime: new Date(),
        answeredQuestions: selectedAnswers.map((answer, index) => ({
          question: `Question ${index + 1}`,
          answer: answer,
          isCorrect: answer === correctAnswers[index],
        })),
      });
  
      // Save the quiz result to the database
      await quizResult.save();
  
      res.status(200).send('Quiz results saved successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving quiz results to the database');
    }
  });

module.exports = router;