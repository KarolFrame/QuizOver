import React, { useState, useEffect } from "react";


export const VideoPet = ({ onIdle }) => {
    const [isIdle, setIsIdle] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMoveToTop(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isIdle && onIdle) {
            onIdle();
        }
    }, [isIdle]);

    return (
        <div
            className={`
                flex justify-center transition-all duration-700 ease-in-out
                ${moveToTop ? "items-start" : "items-center"}
            `}
        >
            <video
                src={isIdle ? "/video/v_idle.webm" : "/video/v_hello.webm"}
                autoPlay
                muted
                playsInline
                loop={isIdle}
                onEnded={() => setIsIdle(true)}
                style={{
                    width: isIdle ? "20%" : "50%",
                    height: "auto",
                    transition: "width 0.5s ease",
                    pointerEvents: "none",
                    background: "none",
                }}
            />
        </div>
    );
};
