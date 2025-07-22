import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ProgressInGame } from "../components/ProgressInGame/ProgressInGame.jsx";
import { QuestionAndAnswers } from "../components/QuestionAndAnswers.jsx";
import { getQuestionAndAnswer } from "../services/questionsAnsAnswersService.js";
import { QuestionsLoader } from "../components/QuestionsLoader/QuestionsLoader.jsx";
import useSound from 'use-sound';
import { AnswerAnimReaction } from "../components/AnswerAnimReaction.jsx";
import { GameEnd } from "./GameEnd.jsx";
import { Button } from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

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
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const navigate = useNavigate();

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

    // Función unificada para mostrar confirmación de salida
    const showExitConfirmationToast = () => {
        // Limpiar cualquier toast anterior
        toast.dismiss();

        toast('', {
            duration: Infinity,
            closeButton: false,
            // Toast personalizado con JSX
            jsx: (
                <div className="flex flex-col items-center text-center w-full">
                    {/* Texto en la parte superior */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-white mb-2">
                            Are you sure you want to quit the game?
                        </h3>
                        <p className="text-gray-300 text-sm">
                            If you quit now, you will lose all progress from the current match. Time keeps running...
                        </p>
                    </div>

                    {/* Botones en la parte inferior */}
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={() => {
                                toast.dismiss();
                                toast.success('Great! Let\'s keep playing', {
                                    description: 'The game continues...',
                                    duration: 2000
                                });
                            }}
                            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            Keep playing
                        </button>
                        <button
                            onClick={() => {
                                toast.dismiss();
                                executeExitGame();
                            }}
                            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            Yes, quit
                        </button>
                    </div>
                </div>
            )
        });
    };

    // Efecto para interceptar refresh/navegación y mostrar nuestro toast
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            // Solo si hay un juego en progreso
            if (hearts > 0 && questionAndAnswers) {
                e.preventDefault();

                // Mostrar nuestro toast personalizado
                showExitConfirmationToast();

                // Esto previene que la página se cierre inmediatamente
                // dando tiempo al usuario para ver y responder al toast
                e.returnValue = '';
                return '';
            }
        };

        const handlePopState = (e) => {
            // Interceptar navegación hacia atrás
            if (hearts > 0 && questionAndAnswers) {
                e.preventDefault();
                showExitConfirmationToast();

                // Volver a agregar el estado actual al historial
                window.history.pushState(null, null, window.location.pathname);
            }
        };

        // Agregar estado al historial para detectar navegación hacia atrás
        window.history.pushState(null, null, window.location.pathname);

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hearts, questionAndAnswers]);

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

    // Función que ejecuta la lógica real de salida
    const executeExitGame = () => {
        navigate("/dashboard");
    };

    // Función del botón Exit (usa la misma confirmación)
    const handleExitGame = () => {
        showExitConfirmationToast();
    };

    return (
        <div className="flex flex-col items-center justify-center m-5">
            <div className="flex flex-col max-w-[50%] items-center justify-center">
                <div className={`text-center flex flex-col justify-center items-center gap-3 ${shake ? 'shake' : ''} hv-100`} style={{ zIndex: 10 }}>
                    {reaction &&
                        <AnswerAnimReaction frameIndex={frame} />}
                    {hearts > 0 && questionAndAnswers &&
                        (<>
                            <div className="self-start mx-5 " style={{ zIndex: 10 }}>
                                <Button
                                    label="← Exit"
                                    variant="danger"
                                    size="responsive"
                                    onClick={handleExitGame}
                                />
                            </div>
                            <ProgressInGame onTimeOut={() => handleAnswer("", questionAndAnswers.correct_answer)} />
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
                            <GameEnd />
                        </>)}

                </div>
            </div>
        </div>);
};