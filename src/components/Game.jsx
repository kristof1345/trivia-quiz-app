import React, { useEffect, useState } from "react";

const Game = ({ quiz, questionCounter, setQuestionCounter }) => {
  const [lastQuestion, setLastQuestion] = useState(false);
  let Question = quiz[questionCounter].question;
  let options = quiz[questionCounter].incorrectAnswers;
  let correct = quiz[questionCounter].correctAnswer;

  const newOptions = [...options, correct];
  const sortedOptions = newOptions.sort();

  const nextQuestion = () => {
    setQuestionCounter((prev) => prev + 1);
    if (questionCounter === quiz.length - 2) {
      setLastQuestion(true);
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
              <div className="option-div" data-selected="no" key={index}>
                {option}
              </div>
            ))
          : null}
      </div>
      {lastQuestion ? (
        <button className="btn" onClick={() => window.location.reload()}>
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
