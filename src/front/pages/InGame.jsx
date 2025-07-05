import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ProgressInGame } from "../components/ProgressInGame/ProgressInGame.jsx";
import { QuestionAndAnswers } from "../components/QuestionAndAnswers.jsx";
import { getQuestionAndAnswer } from "../services/questionsAnsAnswersService.js";
import { QuestionsLoader } from "../components/QuestionsLoader/QuestionsLoader.jsx";

export const InGame = () => {
  const { store, dispatch } = useGlobalReducer();
  const { hearts } = store.currentGame;
  const [questionAndAnswers, setQuestionAndAnswers] = useState(null);
  const called = useRef(false);
  const loadNewQuestion = async () => {
    try {
      const data = await getQuestionAndAnswer();
      setQuestionAndAnswers(data);
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    loadNewQuestion();
  }, []);


  const handleAnswer = (selectedAnswer, correctAnswer) => {
    const isCorrect = selectedAnswer == correctAnswer;

    dispatch({
      type: "SET_ANSWER_RESULT",
      payload: {
        isCorrect,
      },
    });

    setQuestionAndAnswers(null);


    setTimeout(() => {
      loadNewQuestion();
    }, 500);
  };

  return (
    <div className="text-center flex flex-col mt-5 justify-center items-center gap-3">
      {hearts > 0 
        ? (<>{questionAndAnswers 
          ? (<>
          <ProgressInGame onTimeOut={() => handleAnswer("", questionAndAnswers.correct_answer)} />
          <p>{questionAndAnswers.correct_answer}</p>
          <QuestionAndAnswers
            question={questionAndAnswers.question}
            option1={questionAndAnswers.correct_answer}
            option2={questionAndAnswers.incorrect_answer}
            image={questionAndAnswers.image_url}
            onAnswer={handleAnswer}
            correct={questionAndAnswers.correct_answer}
          />
        </> 
        ) 
        :(
          <QuestionsLoader />)}
        </>)
    :(<>
      <p>HAS MUERTO</p>
    </>)}
      
    </div>
  );
};
