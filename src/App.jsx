import { HomePage } from "./components/HomePage";
import { QuizPage } from "./components/QuizPage";
import { useState, useEffect } from "react";

function App() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [correctAnswers,setCorrectAnswers] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setQuizzes(data.results);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort(); // cancels the first call when effect re-runs
  }, []);

  async function fetchData(){
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple");
    const data = await res.json();
    const result = data.results;
    setQuizzes(result)
  }

  function start() {
    setIsHomePage((prev) => !prev);
    console.log(isHomePage);
  }

  function handleSelect(questionIndex, answer) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: {
        selectedAnswer: answer,
        isCorrect:
          quizzes[questionIndex].correct_answer === answer ? true : false,
        answer: quizzes[questionIndex].correct_answer,
      },
    }));
  }

  function checkAnswers() {
    const correctAnswers = Object.values(selectedAnswers).filter(item => item.isCorrect).length
    setCorrectAnswers(correctAnswers)
    setIsChecked((prev) => !prev);
  }

  function handleReset() {
    fetchData();
    setIsChecked(false);
    setSelectedAnswers({});
    setCorrectAnswers(0)
  }
  return (
    <>
      {
        (isHomePage ? (
          <HomePage onClick={start} />
        ) : quizzes.length !== 0 && (
          <QuizPage
            quizzes={quizzes}
            selectedAnswers={selectedAnswers}
            onSelect={handleSelect}
            checkAnswers={checkAnswers}
            isChecked={isChecked}
            handleReset={handleReset}
            correctAnswers={correctAnswers}
          />
        ))}
    </>
  );
}

export default App;
