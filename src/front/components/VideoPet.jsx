import React, { useEffect, useState } from "react"

export const VideoPet = () => {
    const [isIdle, setIsIdle] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMoveToTop(true);
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                height: isIdle ? "150px" : "200px",
                transition: "height 1s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: moveToTop ? "flex-start" : "center",
            }}
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
