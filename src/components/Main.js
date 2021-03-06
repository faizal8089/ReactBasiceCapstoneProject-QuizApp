import React, { useEffect, useState } from "react";
import "../css/main.scss";
import Questions from "./Questions";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

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
            optionLocked: false,
            question: item.question,
            correctAnswer: item.correct_answer,
            options: options,
          };
        });
        setEls(simplifiedData);
      } catch (error) {
        console.log(error);
        fetchData();
      }
    };
    fetchData();
  }, []);

  function updateOptions(thing, index, correctAnswer) {
    const updatedColor = {
      option: thing.option,
      isLocked: true,
      color: { backgroundColor: "red", color: "white" },
    };

    setEls((pre) => {
      return pre.map((item) => {
        return item.correctAnswer === correctAnswer
          ? {
              ...item,
              optionLocked: true,
              options: Object.values({
                ...item.options,
                [index]: updatedColor,
              }),
            }
          : item;
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("checkAnswer", JSON.stringify(checkAnswer));
    const elements = els.map((item) => {
      return (
        <Questions
          key={nanoid()}
          optionLocked={item.optionLocked}
          question={item.question}
          correctAnswer={item.correctAnswer}
          options={item.options}
          scorePlus={countScore}
          updateOptions={updateOptions}
        />
      );
    });

    setData(elements);
  }, [checkAnswer, els]);

  return (
    <div>
      <center>
        {data.length === 0 && (
          <ReactLoading
            className="loadingScreen"
            type={"bars"}
            color={"#ffffff"}
            height={"20%"}
            width={"20%"}
          />
        )}
      </center>

      {!checkAnswer && data.length !== 0 && (
        <center>
          <h3>Choose option wisely... cannot change option once selected ! </h3>
          <hr />
        </center>
      )}
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
