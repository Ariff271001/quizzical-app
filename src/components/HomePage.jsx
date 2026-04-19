import "../styles/HomePage.css";

export function HomePage(props) {
  return (
    <>
      <div className="blob-top-right"></div>
      <div className="blob-bottom-left"></div>

      <div className="content">
        <h1>Quizzical</h1>
        <p>Click the button below to start the quiz!</p>
        <button onClick={props.onClick}>Start quiz</button>
      </div>
    </>
  );
}
