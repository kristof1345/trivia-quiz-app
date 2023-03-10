import { useEffect, useState } from "react";
import StartEndPage from "./components/StartEndPage";
import axios from "axios";
import Game from "./components/Game";
import { BsSun, BsMoon } from "react-icons/bs";

function App() {
  const [gameStatus, setGameStatus] = useState(true);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

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
    <div className={`App ${theme}`}>
      {!gameStatus && <StartEndPage score={score} quiz={quiz} theme={theme} />}
      {gameStatus && (
        <div className="game-holder">
          {theme === "light" ? (
            <BsSun onClick={() => toggleTheme()} className="icon" />
          ) : (
            <BsMoon onClick={() => toggleTheme()} className="icon" />
          )}
          {quiz.length !== 0 ? (
            <Game
              quiz={quiz}
              questionCounter={questionCounter}
              setQuestionCounter={setQuestionCounter}
              setScore={setScore}
              score={score}
              setGameStatus={setGameStatus}
              theme={theme}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
