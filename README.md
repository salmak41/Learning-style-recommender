# Learning Style Recommender 🎓

A full-stack web application that identifies users' learning styles using the VARK model and provides personalized educational resources.

## 🚀 Features

- *VARK Learning Assessment* - 4-question quiz to determine learning style
- *Personalized Recommendations* - AI-powered resource suggestions
- *Modern Stack* - React frontend + Express.js backend
- *Responsive Design* - Bootstrap-powered UI

## 🛠 Tech Stack

*Frontend:* React, Bootstrap, JavaScript  
*Backend:* Node.js, Express.js, CORS  
*Architecture:* REST API, Modular Design

## 📁 Project Structure
```

learning-recommender/
├──backend/           # Express.js API
│├── utils/         # Business logic
│├── data/          # Questions & resources
│└── server.js      # Main server file
├──frontend/          # React application
│├── src/           # React components
│├── public/        # Static files
│└── package.json   # Dependencies
└──README.md          # Documentation

```
## 🚀 Quick Start

### Backend (Port 5000)
. bash
. cd backend
. npm install
. node server.js


### Frontend (Port 3000)
. bash
. cd frontend
. npm install
. npm start


## 📚 API Endpoints

· GET /api/test - Health check
· GET /api/questions - Get VARK questions
· POST /api/submit-quiz - Submit answers, get learning style
· GET /api/resources - Get personalized resources

## 👥 Team

- *Salma Kousar*
- *Pratibha*
- *Saniya*
