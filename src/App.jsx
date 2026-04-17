import { HomePage } from "./components/HomePage";
import { QuizPage } from "./components/QuizPage";
import { useState,useEffect } from "react";

function App() {
  const [isHomePage,setIsHomePage] = useState(true)

  function start(){
    setIsHomePage(prev => !prev)
  }
  return (
    <>
      {isHomePage ? <HomePage onClick={start}/> : <QuizPage />}
    </>
  );
}

export default App;
