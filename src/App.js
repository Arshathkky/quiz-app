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
import './App.css';

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
  const [showStartButton, setShowStartButton] = useState(true); // State to track whether to show the start button or not
  const [showEndDialog, setShowEndDialog] = useState(false); // State to track whether to show the end dialog

  const nextButtonRef = useRef(null);
  const previousButtonRef = useRef(null);

  useEffect(() => {
    fetchQuizzes();
    document.addEventListener('keydown', handleKeyPress);

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
        if (currentIndex < quizzes.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          setShowEndDialog(true);
        }
      }, 2000);
    }
  }, [selectedAnswer, currentIndex, quizzes]);

  const fetchQuizzes = () => {
    setQuizzes(exampleQuizzes);
  };

  const handleKeyPress = (event) => {
    console.log(`Key pressed: ${event.key}`);
    if (showStartButton && event.key === ' ') {
      console.log('Space bar pressed to start quiz');
      handleStartQuiz();
      return;
    }

    if (showEndDialog && event.key === ' ') {
      console.log('Space bar pressed to restart quiz');
      handleRestartQuiz();
      return;
    }

    switch (event.key) {
      case 'M':
      case 'm':
        console.log('Next key pressed');
        handleNext();
        break;
      case 'X':
      case 'x':
        console.log('Previous key pressed');
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
    console.log('Handling next question');
    clearTimeout(questionTimeout);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < quizzes.length - 1 ? prevIndex + 1 : prevIndex;
      console.log(`New currentIndex: ${newIndex}`);
      return newIndex;
    });
  };

  const handlePrevious = () => {
    console.log('Handling previous question');
    clearTimeout(questionTimeout);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      console.log(`New currentIndex: ${newIndex}`);
      return newIndex;
    });
  };

  const handleAnswerSelection = (answer) => {
    console.log(`Answer selected: ${answer}`);
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
  }, [currentIndex, selectedAnswer]);

  const handleStartQuiz = () => {
    alert('Welcome to the Quiz App! Press "M" to move to the next question, "X" to go to the previous question, and "C", "V", "B", "N" to select answers.');
    // Hide the "Let's Start" button and start the quiz
    setShowStartButton(false);
  };

  const handleRestartQuiz = () => {
    // Reset the state to start the quiz again
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setCorrectCount(0);
    setShowEndDialog(false);
    setShowStartButton(true); // Optional: show the start button again
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='Heading'>Quiz App</h1>
      {showStartButton && (
        <button className='startBtn' onClick={handleStartQuiz}>Click here to Start</button>
      )}
      {!showStartButton && !showEndDialog && (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{quizzes[currentIndex]?.question}</p>
              <video
                style={{ maxWidth: '80%', height: 'auto', marginBottom: '20px' }}
                autoPlay
                controls
                src={quizzes[currentIndex]?.videoPath}
              />
              {showFeedback && (
                <p style={{ color: isCorrect ? 'green' : 'red', fontWeight: 'bold' }}>
                  {isCorrect ? 'Correct Answer!' : 'Wrong Answer!'}
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
      {showEndDialog && (
        <div>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Quiz Completed!
          </p>
          <p style={{ fontSize: '16px' }}>
            Correct Answers: {correctCount}
          </p>
          <p style={{ fontSize: '16px' }}>
            Wrong Answers: {quizzes.length - correctCount}
          </p>
          <button onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
