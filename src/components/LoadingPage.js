import React from "react";
import "../css/loadingPage.scss";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();
  return (
    <center>
      <fieldset className="fieldset">
        <h2 className="heading">Quizzical</h2>
        <p className="desc">Your favourite quiz site !</p>
        <button onClick={() => navigate("/main")} className="start-btn">
          Start quiz
        </button>
      </fieldset>
    </center>
  );
};

export default LoadingPage;
