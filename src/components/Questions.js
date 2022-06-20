import "../css/questions.scss";
import { useState } from "react";
import { useEffect } from "react";

const Questions = ({
  updateOptions,
  question,
  correctAnswer,
  options,
  scorePlus,
  optionLocked,
}) => {
  // console.log(correctAnswer);

  const [optionElements, setoptionElements] = useState(() => {
    return options;
  });
  const [checkAnswer, setCheckAnswer] = useState(() => false);
  // console.log(optionElements);
  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("checkAnswer"));
    if (check) {
      setCheckAnswer(check);
      setoptionElements((pre) =>
        pre.map((i) => {
          return i.option === correctAnswer
            ? {
                ...i,
                isLocked: true,
                color: { backgroundColor: "green", color: "white" },
              }
            : i;
        })
      );
    }
  }, [correctAnswer]);

  // console.log(disable);
  // console.log(optionElements);
  const elements = optionElements.map((item) => {
    function check(thing) {
      updateOptions(thing, optionElements.indexOf(thing), correctAnswer);
      if (!checkAnswer) {
        setoptionElements((pre) =>
          pre.map((i) => {
            return i.option === thing.option
              ? {
                  ...i,
                  isLocked: true,
                  color: { backgroundColor: "red", color: "white" },
                }
              : i;
          })
        );
      }
    }

    return (
      <li key={item.option}>
        <button
          style={item.color}
          disabled={optionLocked || checkAnswer}
          onClick={() => {
            if (item.option === correctAnswer) {
              scorePlus();
            }
            check(item);
          }}
          className="options"
        >
          {decodeURIComponent(item.option)}
        </button>
      </li>
    );
  });

  return (
    <div>
      <h3 className="question">{decodeURIComponent(question)}</h3>
      <ol className="list">{elements}</ol>
      <hr />
    </div>
  );
};

export default Questions;
