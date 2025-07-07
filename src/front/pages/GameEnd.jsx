import React, { useEffect, useState } from "react";
import { ExperienceService } from "../services/ExperienceService";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const GameEnd = () => {
    const { store } = useGlobalReducer();
    const [status, setStatus] = useState("saving");

    const experiencePoints = store.currentGame.correctAnswers * 10;
    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("jwt-token");

    useEffect(() => {
        async function saveXP() {
            try {
                await updateExperience(userId, experiencePoints, token);
                setStatus("done");
            } catch (error) {
                console.error("Error updating XP:", error);
                setStatus("error");
            }
        }

        saveXP();
    }, []);

    if (status === "saving") return <p>Guardando tus puntos de experiencia...</p>;
    if (status === "error") return <p>Ocurrió un error al guardar tus puntos.</p>;

    return (
        <div>
            <h2>Juego terminado</h2>
            <p>Correctas: {store.currentGame.correctAnswers}</p>
            <p>Ganaste {experiencePoints} puntos de experiencia!</p>
        </div>
    );
};
