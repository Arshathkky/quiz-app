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


const Home = () => {
  
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
    
      const nextButtonRef = useRef(null);
      const previousButtonRef = useRef(null);
    
      useEffect(() => {
        fetchQuizzes();
        if (nextButtonRef.current) {
          nextButtonRef.current.focus();
        }
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
    
      return (
        <div>
          <h1>Quiz App</h1>
          <ul>
            <li>
              <p>{quizzes[currentIndex]?.question}</p>
              <video
                width="1024"
                height="700"
                autoPlay
                controls
                src={quizzes[currentIndex]?.videoPath}
              />
              {showFeedback && (
                <p>{isCorrect ? '!ЯƎWƧИA TƆƎЯЯOƆ' : '!ЯƎWƧИA ӘИOЯW' }</p>
              )}
              
            </li>
          </ul>
          <div>
            <button ref={previousButtonRef} onClick={handlePrevious} disabled={currentIndex === 0}>
            (X) ƧUOIVƎЯꟼ
            </button>
            <button onClick={() => handleAnswerSelection("1")} disabled={selectedAnswer !== null}>
            A ИOITꟼO
            </button>
            <button onClick={() => handleAnswerSelection("2")} disabled={selectedAnswer !== null}>
            ꓭ ИOITꟼO
            </button>
            <button onClick={() => handleAnswerSelection("3")} disabled={selectedAnswer !== null}>
            Ɔ ИOITꟼO
            </button>
            <button onClick={() => handleAnswerSelection("4")} disabled={selectedAnswer !== null}>
            ꓷ ИOITꟼO
            </button>
            <button ref={nextButtonRef} onClick={handleNext} disabled={currentIndex === quizzes.length - 1}>
            (M) TXƎИ
            </button>
          </div>
          <p>:ƧЯƎWƧИA TƆЯЯOƆ {correctCount}</p>
        </div>
      );
  
}

export default Home;
