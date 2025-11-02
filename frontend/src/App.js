import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [learningStyle, setLearningStyle] = useState(null);

  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/test');
      const data = await response.json();
      alert('✅' + data.message);
    } catch (error) {
      alert('❌ Cannot connect to backend server');
    }
  };

  const testQuestionsAPI = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      alert('✅ Loaded ' + data.length + 'questions from backend!');
    } catch (error) {
      alert('❌ Cannot load questions from backend');
    }
  };

  const testQuizSubmission = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'testuser',
          answers: ['V', 'A', 'R', 'K','V','A'] // Sample answers
        })
      });
      const data = await response.json();
      
      if(data.message){
        alert('🎯' + data.message);
      }else if (data.learningStyle){

      
      alert('🎯 Quiz Result: you are a' +data.learningStyle + 'Learner!');

    }else{
        alert('🎯 Quiz completed!');
    }
}
    catch (error) {
      alert('❌ Quiz submission failed');
    }
  };

  const startQuiz = () => {
    setCurrentView('quiz');
  };

  const showRecommendations = (style) => {
    setLearningStyle(style);
    setCurrentView('recommendations');
  };

  return (
    <div className="App">
      <div className="container mt-4">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container">
            <span className="navbar-brand">🎓 Learning Style Recommender</span>
            <div>
              <button 
                className="btn btn-outline-light btn-sm me-2"
                onClick={testBackendConnection}
              >
                Test Connection
              </button>
              <button 
                className="btn btn-outline-light btn-sm me-2"
                onClick={testQuestionsAPI}
              >
                Test Questions API
              </button>
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={testQuizSubmission}
              >
                Test Quiz API
              </button>
            </div>
          </div>
        </nav>

        {/* Home View */}
        {currentView === 'home' && (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-body text-center p-5">
                  <h1 className="card-title text-primary mb-4">
                    Discover Your Learning Style
                  </h1>
                  <p className="lead mb-4">
                    Take our quick VARK assessment to understand how you learn best 
                    and get personalized learning resources.
                  </p>
                  <button 
                    className="btn btn-primary btn-lg px-5"
                    onClick={startQuiz}
                  >
                    Start Learning Style Quiz
                  </button>
                  
                  <div className="mt-5">
                    <div className="alert alert-success">
                      ✅ Manual React Setup Complete! All APIs ready for testing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz View */}
        {currentView === 'quiz' && (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-body text-center p-5">
                  <h3>Learning Style Quiz</h3>
                  <p>Phase 1: This is where the actual quiz will be built!</p>
                  <div className="mt-4">
                    <button 
                      className="btn btn-secondary me-2"
                      onClick={() => setCurrentView('home')}
                    >
                      Back to Home
                    </button>
                    <button 
                      className="btn btn-primary me-2"
                      onClick={() => showRecommendations('Visual')}
                    >
                      Simulate Visual Learner
                    </button>
                    <button 
                      className="btn btn-success"
                      onClick={() => showRecommendations('Kinesthetic')}
                    >
                      Simulate Kinesthetic Learner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations View */}
        {currentView === 'recommendations' && (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-primary">
                      Recommendations for {learningStyle} Learners
                    </h4>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setCurrentView('home')}
                    >
                      Back to Home
                    </button>
                  </div>
                  <div className="alert alert-info">
                    Ready for Phase 1 development!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;