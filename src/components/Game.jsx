import React, { useEffect, useState } from "react";

const Game = ({
  quiz,
  questionCounter,
  setQuestionCounter,
  setScore,
  score,
  setGameStatus,
  theme,
}) => {
  const [lastQuestion, setLastQuestion] = useState(false);
  let Question = quiz[questionCounter].question;
  let options = quiz[questionCounter].incorrectAnswers;
  let correct = quiz[questionCounter].correctAnswer;

  const newOptions = [...options, correct];
  const sortedOptions = newOptions.sort();

  const nextQuestion = () => {
    const selected = document.querySelector('[data-selected="yes"]');
    if (selected === null) {
      alert("Please select an answer");
    } else if (selected.textContent === correct) {
      setScore((prev) => (prev += 1));
      setQuestionCounter((prev) => prev + 1);
      if (questionCounter === quiz.length - 2) {
        setLastQuestion(true);
      }
    } else {
      setQuestionCounter((prev) => prev + 1);
      if (questionCounter === quiz.length - 2) {
        setLastQuestion(true);
      }
    }
    let elems = document.querySelectorAll(".option-div");
    [...elems].map((el) => {
      el.dataset.selected = "no";
    });
  };

  const selecAnswer = (e) => {
    const clicked = e.target;
    let elems = document.querySelectorAll(".option-div");
    let arrElems = [...elems];
    clicked.dataset.selected = "yes";
    let index = arrElems.indexOf(clicked);
    let filteredElems = arrElems.filter((el, ind) => index !== ind);
    filteredElems.map((el) => {
      el.dataset.selected = "no";
    });
  };

  const submitQuiz = () => {
    const selected = document.querySelector('[data-selected="yes"]');
    if (selected === null) {
      alert("Please select an answer");
    } else if (selected.textContent === correct) {
      setScore((prev) => (prev += 1));
      setGameStatus((prev) => !prev);
    } else {
      setGameStatus((prev) => !prev);
    }
  };

  return (
    <div className="game">
      <span className="question-counter">{`Question ${
        questionCounter + 1
      } out of ${quiz.length}`}</span>
      <div className="question">{Question}</div>
      <hr className="divider" />
      <div className="options">
        {options
          ? sortedOptions.map((option, index) => (
              <div
                className="option-div"
                data-selected="no"
                key={index}
                onClick={(e) => selecAnswer(e)}
              >
                {option}
              </div>
            ))
          : null}
      </div>
      {lastQuestion ? (
        <button className="btn" onClick={() => submitQuiz()}>
          Submit
        </button>
      ) : (
        <button className="btn" onClick={() => nextQuestion()}>
          Next
        </button>
      )}
    </div>
  );
};

export default Game;
