import React, { useState, useEffect, useRef } from "react";

export const VideoPet = ({ onIdle }) => {
    const [isIdle, setIsIdle] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);
    const wrapperRef = useRef(null);

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
    }, [isIdle, onIdle]);

    const videoWidth = isIdle ? "45vh" : "80vh";

    return (
        <div
            ref={wrapperRef}
            className={`flex justify-center items-center transition-all duration-700 ease-in-out`}
        >
            <video
                src={isIdle ? "/video/v_idle.webm" : "/video/v_hello.webm"}
                autoPlay
                muted
                playsInline
                loop={isIdle}
                onEnded={() => setIsIdle(true)}
                style={{
                    width: videoWidth,
                    height: "auto",
                    transition: "width 0.5s ease-in-out",
                    pointerEvents: "none",
                    background: "none",
                    display: "block",
                }}
            />
        </div>
    );
};