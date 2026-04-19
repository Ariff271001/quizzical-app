import { useMemo } from "react";
import { decode } from "html-entities";
import { clsx } from "clsx";
import "../styles/QuizPage.css";

export function QuizPage(props) {
  const shuffledAnswers = useMemo(() => {
    return props.quizzes.map((quiz) =>
      shuffle([quiz.correct_answer, ...quiz.incorrect_answers]),
    );
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
        <p className="q-text">{decode(quiz.question)}</p>
        <div className="options">
          {(shuffledAnswers[index] || []).map((answer, i) => {
            const className = clsx({
              selected: props.selectedAnswers[index]?.selectedAnswer === answer,
              right:
                props.isChecked &&
                props.selectedAnswers[index]?.answer === answer,
              wrong:
                props.isChecked &&
                props.selectedAnswers[index]?.selectedAnswer === answer &&
                !props.selectedAnswers[index]?.isCorrect,
              others:
                props.isChecked &&
                props.selectedAnswers[index]?.answer !== answer,
            });
            return (
              <button
                key={i}
                className={`opt ${className}`}
                onClick={() => props.onSelect(index, answer)}
                disabled={props.isChecked ? true : false}
              >
                {decode(answer)}
              </button>
            );
          })}
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
          {props.isChecked ? (
            <div className="check-btn-wrap">
              <p>You scored {props.correctAnswers} correct answers</p>
              <button onClick={props.handleReset}>Play again</button>
            </div>
          ) : (
            <button className="check-btn" onClick={props.checkAnswers}>
              Check answers
            </button>
          )}
        </div>
      </div>
    </>
  );
}
