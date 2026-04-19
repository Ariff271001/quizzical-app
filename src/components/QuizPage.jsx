import { useState, useEffect } from "react";
import "../styles/QuizPage.css";

export function QuizPage(props) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const shuffled = props.quizzes.map((quiz) =>
      shuffle([quiz.correct_answer, ...quiz.incorrect_answers]),
    );
    setShuffledAnswers(shuffled);
  }, [props.quizzes]);

  function shuffle(array) {
    const arr = [...array]; // copy so you don't mutate the original
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
  }

  const quizzesElement = props.quizzes.map((quiz, index) => {
    return (
      <div className="question-block" key={index}>
        <p className="q-text">{quiz.question}</p>
        <div className="options">
          {(shuffledAnswers[index] || []).map((answer, i) => (
          <button
            key={i}
            className={`opt ${props.selectedAnswers[index] === answer ? 'selected' : ''}`}
            onClick={() => props.onSelect(index, answer)}
          >
            {answer}
          </button>
        ))}
        </div>
        <hr></hr>
      </div>
    );
  });
  
  return (
    <>
      <div className="blob-top-right"></div>
      <div className="blob-bottom-left"></div>

      <div className="q-content">
        {quizzesElement}

        <div className="check-btn-wrap">
          <button className="check-btn">Check answers</button>
        </div>
      </div>
    </>
  );
}
