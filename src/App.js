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
import TitleVideo from './hologram_video_output/Title_Video.mp4';
import './App.css';
import ReactPlayer from 'react-player';

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
  const [correctCount, setCorrectCount] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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
      setCorrectCount((prevCount) => (correct ? prevCount + 1 : prevCount));
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
    if (showStartButton && event.key === ' ') {
      handleStartQuiz();
      handleRestartQuiz();
      return;
    }

    if (showEndDialog && event.key === ' ') {
      handleRestartQuiz();
      return;
    }

    switch (event.key) {
      case 'm':
      case 'M':
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
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < quizzes.length - 1 ? prevIndex + 1 : prevIndex;
      return newIndex;
    });
  };

  const handlePrevious = () => {
    clearTimeout(questionTimeout);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      return newIndex;
    });
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
  }, [currentIndex, selectedAnswer]);

  const handleStartQuiz = () => {
    setShowVideo(true);
    setShowStartButton(false);   
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setCorrectCount(0);
    setShowEndDialog(false);
    setShowStartButton(false);
  };

  return (
    <div className="container">
      {showStartButton && (
        <button className='startBtn' onClick={handleStartQuiz}>TЯATƧ OT ЯAꓭƎƆAꟼƧ ꓘƆI⅃Ɔ</button>
      )}

      {showVideo && (
        <div className="videoContainer">
          <ReactPlayer
            url={TitleVideo}
            playing
            muted
            controls
            onEnded={() => setShowVideo(false)}
            width="100%"
            height="100vh"
          />
        </div>
      )}

      {!showStartButton && !showVideo && !showEndDialog && (
        <>
          <div className="videoContainer">
            <video
              className="quizVideo"
              autoPlay
              src={quizzes[currentIndex]?.videoPath}
              style={{ width: '100%', height: '100vh' }}
            />
            {showFeedback && (
              <p className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                {isCorrect ? '!ЯƎWƧИA TƆƎЯЯOƆ' : '!ЯƎWƧИA ӘИOЯW'}
              </p>
            )}
            <div className="buttonContainer">
              <button className ="button" ref={previousButtonRef} onClick={handlePrevious} disabled={currentIndex === 0}>
              (X)ƧUOIVƎЯꟼ
              </button>
              <button className ="button" onClick={() => handleAnswerSelection("1")} disabled={selectedAnswer !== null}>
              A ИOITꟼO
              </button>
              <button className ="button" onClick={() => handleAnswerSelection("2")} disabled={selectedAnswer !== null}>
              ꓭ ИOITꟼO
              </button>
              <button className ="button" onClick={() => handleAnswerSelection("3")} disabled={selectedAnswer !== null}>
              Ɔ ИOITꟼO
              </button>
              <button className ="button" onClick={() => handleAnswerSelection("4")} disabled={selectedAnswer !== null}>
              ꓷ ИOITꟼO
              </button>
              <button className ="button" ref={nextButtonRef} onClick={handleNext} disabled={currentIndex === quizzes.length - 1}>
              (M) TXƎИ
              </button>
            </div>
          </div>
        </>
      )}
      {showEndDialog && (
        <div>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            !ꓷƎTƎ⅃ꟼMOƆ ZIUϘ
          </p>
          <p style={{ fontSize: '16px' }}>
          {correctCount}:ƧЯƎWƧИA TƆЯЯOƆ 
          </p>
          <p style={{ fontSize: '16px'}}>
          {quizzes.length - correctCount}:ƧЯƎWƧИA ӘИOЯW 
          </p>
          <button className='restartBtn' onClick={handleRestartQuiz}>
          (ЯAꓭƎƆAꟼƧ ƎHT ƧƧƎЯꟼ)ZIUϘ ƎHT TЯƎƧƎЯ
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
