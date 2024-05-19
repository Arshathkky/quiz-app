import React, { useState, useEffect, useRef } from 'react';
import Question1 from './hologram_video_output/que01.mp4';
import Question2 from './hologram_video_output/que02.mp4';
import Question3 from './hologram_video_output/que03.mp4';
import Question4 from './hologram_video_output/que04.mp4';
import Question5 from './hologram_video_output/que05.mp4';
import Question6 from './hologram_video_output/que06.mp4';
import Question7 from './hologram_video_output/que07.mp4';
import Question8 from './hologram_video_output/que08.mp4';
import Question9 from './hologram_video_output/que09.mp4';
import Question10 from './hologram_video_output/que10.mp4';
import Correct from './hologram_video_output/correct1.mp4';
import './App.css'
function App() {
  const exampleQuizzes = [
    { videoPath: Question1, correctAnswer: "1" },
    { videoPath: Question2, correctAnswer: "2" },
    { videoPath: Question3, correctAnswer: "3" },
    { videoPath: Question4, correctAnswer: "4" },
    { videoPath: Question5, correctAnswer: "2" },
    { videoPath: Question6, correctAnswer: "1" },
    { videoPath: Question7, correctAnswer: "4" },
    { videoPath: Question8, correctAnswer: "3" },
    { videoPath: Question9, correctAnswer: "4" },
    { videoPath: Question10, correctAnswer: "1" }
  ];

  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionTimeout, setQuestionTimeout] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // State to hold the count of correct answers
  const [showStartButton, setShowStartButton] = useState(false); // State to track whether to show the start button or not

  const nextButtonRef = useRef(null);
  const previousButtonRef = useRef(null);

  useEffect(() => {
    fetchQuizzes();
    if (nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
    document.addEventListener('keydown', handleKeyPress);
  
    alert('Welcome to the Quiz App! Press "M" to move to the next question, "X" to go to the previous question, and "C", "V", "B", "N" to select answers.');
    
    setShowStartButton(true);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  useEffect(() => {
    if (selectedAnswer !== null) {
      clearTimeout(questionTimeout);
      setShowFeedback(true);
      const correct = selectedAnswer === quizzes[currentIndex].correctAnswer;
      setIsCorrect(correct);
      setCorrectCount((prevCount) => (correct ? prevCount + 1 : prevCount)); // Increment correct count if the answer is correct
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex < quizzes.length - 1 ? prevIndex + 1 : prevIndex));
        setSelectedAnswer(null);
        setShowFeedback(false);
      }, 2000);
    }
  }, [selectedAnswer, currentIndex, quizzes]);

  const fetchQuizzes = () => {
    setQuizzes(exampleQuizzes);
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    switch (event.key) {
      case 'M':
      case 'm':
        handleNext();
        break;
      case 'X':
      case 'x':
        handlePrevious();
        break;
      case 'C':
      case 'c':
          handleAnswerSelection("1");
        break;
      case 'V':
      case 'v':
          handleAnswerSelection("2");
          break;
      case 'B':
      case 'b':
          handleAnswerSelection("3");
        break;
      case 'N':
      case 'n':
          handleAnswerSelection("4");
          break;
      default:
        break;
    }
  };

  const handleNext = () => {
    clearTimeout(questionTimeout);
    setCurrentIndex((prevIndex) => (prevIndex < quizzes.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevious = () => {
    clearTimeout(questionTimeout);
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedAnswer === null) {
        handleNext();
        setShowFeedback(false);
      }
    }, 30000);
    setQuestionTimeout(timeoutId);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex]);

  const handleStartQuiz = () => {
    // Hide the "Let's Start" button and start the quiz
    setShowStartButton(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
  <h1 className='Heading'>Quiz App</h1>
  {showStartButton && (
    <button className='startBtn' onClick={handleStartQuiz}>Click here to Start</button>
  )}
  {!showStartButton && (
    <>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{quizzes[currentIndex]?.question}</p>
          <video
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
            autoPlay
            controls
            src={quizzes[currentIndex]?.videoPath}
          />
          {showFeedback && (
            <p style={{ color: isCorrect ? 'green' : 'red', fontWeight: 'bold' }}>
              {isCorrect ? 'Correct Answer!' : 'Wrong Answer!' }
            </p>
          )}
        </li>
      </ul>
      <div style={{ marginBottom: '20px' }}>
        <button ref={previousButtonRef} onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous (X)
        </button>
        <button onClick={() => handleAnswerSelection("1")} disabled={selectedAnswer !== null}>
          Option 1
        </button>
        <button onClick={() => handleAnswerSelection("2")} disabled={selectedAnswer !== null}>
          Option 2
        </button>
        <button onClick={() => handleAnswerSelection("3")} disabled={selectedAnswer !== null}>
          Option 3
        </button>
        <button onClick={() => handleAnswerSelection("4")} disabled={selectedAnswer !== null}>
          Option 4
        </button>
        <button ref={nextButtonRef} onClick={handleNext} disabled={currentIndex === quizzes.length - 1}>
          Next (M)
        </button>
      </div>
      <p style={{ fontSize: '16px' }}>Correct Answers: {correctCount}</p>
    </>
  )}
</div>

  );
}

export default App