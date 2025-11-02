const express = require('express');
const cors = require('cors');
const calculateLearningStyle  = require('./utils/calculateLearningStyle.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Import data from files
const questions = require('./data/data/questions.json');
const resources = require('./data/data/resources.json');

// Learning style names mapping
const styleNames = {
  'V': 'Visual',
  'A': 'Auditory', 
  'R': 'Reading/Writing',
  'K': 'Kinesthetic'
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Get all questions
app.get('/api/questions', (req, res) => {
  try {
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Submit quiz and get learning style results
// Submit quiz and get learning style results
app.post('/api/submit-quiz', (req, res) => {
  try {
    console.log('📥 1. Received submit-quiz request');
    console.log('Request body:', req.body);

    const { username, answers } = req.body;

    console.log('🔍 2. Extracted data - username:', username, 'answers:', answers);

    if (!username || !answers || !Array.isArray(answers)) {
      console.log('❌ 3. Validation failed - missing username or answers');
      return res.status(400).json({ 
        error: 'Username and answers array are required' 
      });
    }

    console.log('✅ 4. Validation passed');

    console.log('🧮 5. Calling calculateLearningStyle function');
    const learningStyle = calculateLearningStyle(answers);
    console.log('🎯 6. Learning style result:', learningStyle);
    
    const result = {
      username: username,
      learningStyle: styleNames[learningStyle],
      styleCode: learningStyle,
      message: `You are a ${styleNames[learningStyle]} learner`
    };

    console.log('📤 7. Sending response:', result);
    
    res.json(result);

  } catch (error) {
    console.error('💥 8. ERROR in submit-quiz:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to process quiz submission: ' + error.message });
  }
});

// Get resources by topic and learning style
app.get('/api/resources', (req, res) => {
  try {
    const { topic, style } = req.query;

    if (!topic || !style) {
      return res.status(400).json({ 
        error: 'Topic and style query parameters are required' 
      });
    }

    const upperStyle = style.toUpperCase();
    const filteredResources = resources.filter(resource =>
      resource.topic.toLowerCase() === topic.toLowerCase() && 
      resource.style === upperStyle
    );

    res.json({
      topic: topic,
      style: upperStyle,
      resources: filteredResources,
      count: filteredResources.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - FIXED: removed the problematic '*'
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('GET  /api/questions');
  console.log('POST /api/submit-quiz');
  console.log('GET  /api/resources?topic=python&style=V');
  console.log('GET  /api/test');
});