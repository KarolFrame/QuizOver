import "./ProgressInGame.css"
import { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const ProgressInGame = ({ onTimeOut }) => {
    const { store } = useGlobalReducer();
    const { rowCorrectAnswers, points, hearts } = store.currentGame;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (onTimeOut) {
                onTimeOut();
            }
        }, 10000);

        return () => clearTimeout(timeout);
    }, [points]);

    return (
        <div className="w-[350px] bg-primary rounded-[20px] p-3">
            <div className="flex flex-row justify-between mx-5 text-(--color-white)">
                <span>Points: {points}</span>
                <span>Combo: {rowCorrectAnswers}</span>
                <span>Hearts: {hearts}</span>
            </div>
            <div className="progress m-3" key={points}>
                <div className="progress-value"></div>
            </div>
        </div>
    );
};
