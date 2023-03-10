import { useEffect, useState } from "react";
import StartEndPage from "./components/StartEndPage";
import axios from "axios";
import Game from "./components/Game";

function App() {
  const [gameStatus, setGameStatus] = useState(true);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [quiz, setQuiz] = useState([]);

  const getQuiz = () => {
    axios
      .get("https://the-trivia-api.com/api/questions?limit=10")
      .then((response) => {
        const Quiz = response.data;
        setQuiz(Quiz);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className="App">
      {!gameStatus && <StartEndPage />}
      {gameStatus && (
        <div className="game-holder">
          {quiz.length !== 0 ? (
            <Game
              quiz={quiz}
              questionCounter={questionCounter}
              setQuestionCounter={setQuestionCounter}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
