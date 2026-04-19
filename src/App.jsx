import { HomePage } from "./components/HomePage";
import { QuizPage } from "./components/QuizPage";
import { useState, useEffect } from "react";

function App() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizzes, setQuizzes] = useState([]);

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

  function start() {
    setIsHomePage((prev) => !prev);
    console.log(isHomePage);
  }

  function handleSelect(questionIndex, answer) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  }
  return (
    <>
      {quizzes.length !== 0 && (isHomePage ? (
        <HomePage onClick={start} />
      ) : (
        <QuizPage
          quizzes={quizzes}
          selectedAnswers={selectedAnswers}
          onSelect={handleSelect}
        />
      ))}
    </>
  );
}

export default App;
