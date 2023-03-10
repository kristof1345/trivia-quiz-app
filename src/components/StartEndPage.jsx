import React from "react";

const startEndPage = ({ score, quiz, theme }) => {
  return (
    <div className={`start-end-overlay ${theme}`}>
      <div className="overlay-holder">
        <div className="results">{`Your score was ${score} out of ${quiz.length}`}</div>
        <button className="start" onClick={() => window.location.reload()}>
          Start game
        </button>
      </div>
    </div>
  );
};

export default startEndPage;
