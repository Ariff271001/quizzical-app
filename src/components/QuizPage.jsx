import "../styles/QuizPage.css";

export function QuizPage(props) {
  function shuffle(array) {
    const arr = [...array]; // copy so you don't mutate the original
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
  }
  const quizzesElement = props.quizzes.map((quiz,index) => {
    const shuffled = shuffle([quiz.correct_answer,...quiz.incorrect_answers])
    return (
      <div className="question-block" key={index}>
        <p className="q-text">{quiz.question}</p>
        <div className="options">
          <button className="opt selected">{shuffled[0]}</button>
          <button className="opt">{shuffled[1]}</button>
          <button className="opt">{shuffled[2]}</button>
          <button className="opt">{shuffled[3]}</button>
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
