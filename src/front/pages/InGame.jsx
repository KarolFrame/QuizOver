import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ProgressInGame } from "../components/ProgressInGame/ProgressInGame.jsx";
import { QuestionAndAnswers } from "../components/QuestionAndAnswers.jsx";
import { getQuestionAndAnswer } from "../services/questionsAnsAnswersService.js";
import { QuestionsLoader } from "../components/QuestionsLoader/QuestionsLoader.jsx";
import useSound from 'use-sound';
import { AnswerAnimReaction } from "../components/AnswerAnimReaction.jsx";

const HAPPY_FRAMES = [0, 5, 6, 8, 10, 11, 12, 13, 14, 15];
const ANGRY_FRAMES = [1, 2, 3, 4, 7, 9, 16, 17, 18, 19];

export const InGame = () => {
  const { store, dispatch } = useGlobalReducer();
  const { hearts } = store.currentGame;
  const [questionAndAnswers, setQuestionAndAnswers] = useState(null);
  const called = useRef(false);
  const [playIncorrect] = useSound("/audio/s_incorrect.mp3")
  const [playcorrect] = useSound("/audio/s_correct.mp3")
  const [reaction, setReaction] = useState(false);
  const [frame, setFrame] = useState(0);
  const [shake, setShake] = useState(false);

  const loadNewQuestion = async () => {
    try {
      const data = await getQuestionAndAnswer();
      setQuestionAndAnswers(data);
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_DEFAULT_STATS" });
    if (called.current) return;
    called.current = true;
    loadNewQuestion();
  }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const getRandomFrame = (list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomElement = list[randomIndex];
    return randomElement;
  }


  const handleAnswer = (selectedAnswer, correctAnswer) => {
    const isCorrect = selectedAnswer == correctAnswer;
    dispatch({
      type: "SET_ANSWER_RESULT",
      payload: {
        isCorrect,
      },
    });

    if (isCorrect) {
      playcorrect();
      setFrame(getRandomFrame(HAPPY_FRAMES));
    }

    else {
      playIncorrect();
      triggerShake();
      setFrame(getRandomFrame(ANGRY_FRAMES));
    }

    setReaction(true);
    setQuestionAndAnswers(null);


    setTimeout(() => {
      loadNewQuestion();
      setReaction(false);
    }, 2000);
  };

  return (
    <div className={`text-center flex flex-col mt-5 justify-center items-center gap-3 ${shake ? 'shake' : ''}`}>
      {reaction &&
        <AnswerAnimReaction frameIndex={frame} />}
      {hearts > 0 && questionAndAnswers &&
        (<>
          <ProgressInGame onTimeOut={() => handleAnswer("", questionAndAnswers.correct_answer)} />
          <p>{questionAndAnswers.correct_answer}</p>
          <QuestionAndAnswers
            question={questionAndAnswers.question}
            option1={questionAndAnswers.correct_answer}
            option2={questionAndAnswers.incorrect_answer}
            image={questionAndAnswers.image_url}
            onAnswer={handleAnswer}
            correct={questionAndAnswers.correct_answer} />
        </>)}
      {hearts > 0 && !questionAndAnswers &&
        (
          <QuestionsLoader />
        )}

      {hearts <= 0 &&
        (<>
          <p>HAS MUERTO</p>
        </>)}

    </div>
  );
};

