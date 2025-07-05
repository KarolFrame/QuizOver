import React, { useEffect, useState, useRef } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ProgressInGame } from "../components/ProgressInGame/ProgressInGame.jsx";
import { QuestionAndAnswers } from "../components/QuestionAndAnswers.jsx";
import { getQuestionAndAnswer } from "../services/questionsAnsAnswersService.js";

export const InGame = () => {
    const [questionAndAnswers, setQuestionAndAnswers] = useState(null);
    const called = useRef(false);

    const newQuestionAndAnswers = async () => {
        console.log("ayuda");
        try {
            const data = await getQuestionAndAnswer();
            setQuestionAndAnswers(data);
        } catch (error) {
            console.error('Error al cargar los datos:', error.message);
        }
    }
    useEffect(() => {
        if (called.current) return;
        called.current = true;
        newQuestionAndAnswers();
    }, []);

    return (
        <div className="text-center flex flex-col mt-5 justify-center items-center gap-3 " >
            <ProgressInGame />
            {questionAndAnswers ?
                <QuestionAndAnswers
                    question={questionAndAnswers.question}
                    option1={questionAndAnswers.correct_answer}
                    option2={questionAndAnswers.incorrect_answer}
                    image={questionAndAnswers.image_url} /> :
                <p className="text-(--color-white)">Cargando pregunta...</p>}
        </div>
    );
}