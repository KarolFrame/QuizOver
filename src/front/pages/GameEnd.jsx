import React, { useEffect, useState } from "react";
import { ExperienceService } from "../services/ExperienceService";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { QuestionsLoader } from "../components/QuestionsLoader/QuestionsLoader";

export const GameEnd = () => {
    const { store } = useGlobalReducer();
    const [status, setStatus] = useState("saving");

    const experiencePoints = store.currentGame.correctAnswers * 10;

    useEffect(() => {
        async function saveXP() {
            try {
                await ExperienceService(experiencePoints);
                setStatus("done");
            } catch (error) {
                console.error("Error updating XP:", error);
                setStatus("error");
            }
        }

        saveXP();
    }, []);

    if (status === "error") return <p>Ocurrió un error al guardar tus puntos.</p>;

    return (<>
        {status == "saving" && <QuestionsLoader />}
        {status == "done" && (
            <motion.div
                className="flex flex-col items-center justify-center text-center md:p-6 rounded-2xl max-w-[100%] md:max-w-[60%] mx-auto backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0, y: -150 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                style={{ zIndex: 10 }}
            >
                <div className="bg-(--color-primary) p-4 w-90 md:60 rounded-2xl">
                    <img src="/images/img_dead.png" />
                    <p className="text-white text-xl  mt-4 mb-1">Finish Game</p>
                    <p className="text-white text-lg mb-1">
                        <span className="font-semibold">Correct Answers:</span> {store.currentGame.correctAnswers}
                    </p>
                    <p className="text-white text-lg">
                        You win <span className="text-(--color-accent)">{experiencePoints}</span> points of experience!
                    </p>
                    <Link to="/ranking/global">
                        <Button label="Continue" variant="info" size="responsive" className="m-4" />
                    </Link>
                </div>
            </motion.div>
        )}

    </>);
};
