export function HomePage(props) {
  return (
    <>
      <div class="blob-top-right"></div>
      <div class="blob-bottom-left"></div>

      <div class="content">
        <h1>Quizzical</h1>
        <p>Click the button below to start the quiz!</p>
        <button onClick={props.onClick}>Start quiz</button>
      </div>
    </>
  );
}
