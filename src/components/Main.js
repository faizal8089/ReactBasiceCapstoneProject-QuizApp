import React, { useEffect, useState } from "react";
import "../css/main.scss";
import Questions from "./Questions";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    return [];
  });

  const [checkAnswer, setCheckAnswer] = useState(() => {
    return false;
  });

  let [score, setScore] = useState(() => {
    return 0;
  });

  const [els, setEls] = useState(() => []);

  function playAgain() {
    window.location.reload(true);
  }
  function countScore() {
    setScore((pre) => {
      return pre + 1;
    });
  }

  useEffect(() => {
    const url =
      "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple&encode=url3986";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();

        const simplifiedData = result.results.map((item) => {
          const optionsArray = [item.correct_answer, ...item.incorrect_answers];
          optionsArray.sort(() => Math.random() - 0.5);
          const options = optionsArray.map((item) => {
            return {
              option: item,
              isLocked: false,
              color: { backgroundColor: "white", color: "black" },
            };
          });
          return {
            question: item.question,
            correctAnswer: item.correct_answer,
            options: options,
          };
        });
        setEls(simplifiedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("checkAnswer", JSON.stringify(checkAnswer));
    const elements = els.map((item) => {
      return (
        <Questions
          key={nanoid()}
          question={item.question}
          correctAnswer={item.correctAnswer}
          options={item.options}
          scorePlus={countScore}
        />
      );
    });

    setData(elements);
  }, [checkAnswer, els]);
  return (
    <div>
      {score === data.length && checkAnswer && <Confetti />}
      {data}
      <center>
        {checkAnswer && (
          <p className="scoreDesc">
            You scored {score} / {data.length} !
          </p>
        )}
        {data.length !== 0 && (
          <button
            onClick={() => (checkAnswer ? playAgain() : setCheckAnswer(true))}
            className="checkAnswer"
          >
            {checkAnswer ? "Play again" : "Check answer"}
          </button>
        )}
        {checkAnswer && (
          <button
            onClick={() => {
              navigate("/");
            }}
            className="homePage"
          >
            Home
          </button>
        )}
      </center>
    </div>
  );
};

export default Main;
