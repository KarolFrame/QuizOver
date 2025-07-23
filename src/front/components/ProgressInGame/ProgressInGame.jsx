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

    const renderHearts = () => {
        const heartsArray = [];
        for (let i = 0; i < 3; i++) {
            heartsArray.push(
                <img
                    key={i}
                    src="/images/heart.png"
                    alt="heart"
                    className={`w-6 h-6 ${i >= hearts ? 'heart-empty' : ''}`}
                />
            );
        }
        return heartsArray;
    };

    return (
        <div className=" w-full h-auto rounded-[20px]
        max-w-[350px] md:max-w-[500px]
        max-h-[200px] md:max-h-[300px] ">
            <div className="flex flex-row justify-between items-center mx-5 text-xl text-white">
                <div className="flex items-center gap-2">
                    <img src="/images/star.png" alt="star" className="w-6 h-6" />
                    <span>{points}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>💥</span>
                    <span>{rowCorrectAnswers}</span>
                </div>
                <div className="flex items-center gap-1">
                    {renderHearts()}
                </div>
            </div>
            <div className="progress m-3 bg-" key={points}>
                <div className="progress-value"></div>
            </div>
        </div>
    );
};