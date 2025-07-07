import React, { useState, useEffect, useRef } from "react";

export const VideoPet = ({ onIdle }) => {
    const [isIdle, setIsIdle] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);
    const [clicks, setClicks] = useState(0);
    const [sad, setSad] = useState(false);
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

    useEffect(() => {
        if (clicks >= 10) {
            setSad(true);
            setClicks(0);
        }
    }, [clicks])

    const videoWidth = isIdle ? "45vh" : "80vh";

    return (
        <div
            ref={wrapperRef}
            className={`flex justify-center items-center transition-all duration-700 ease-in-out`}
        >
            {!sad && (<>
                <video
                    src={isIdle ? "/video/v_idle.webm" : "/video/v_hello.webm"}
                    autoPlay
                    muted
                    playsInline
                    loop={isIdle}
                    onEnded={() => setIsIdle(true)}
                    onClick={() => {
                        setClicks(clicks + 1);
                    }}
                    style={{
                        width: videoWidth,
                        height: "auto",
                        transition: "width 0.5s ease-in-out",
                        pointerEvents: isIdle ? "auto" : "none",
                        background: "none",
                        display: "block",
                    }}
                /></>)}
            {sad && (<>
                <video
                    src={"/video/v_sad.webm"}
                    autoPlay
                    muted
                    playsInline
                    loop={false}
                    onEnded={() => setSad(false)}
                    style={{
                        width: videoWidth,
                        height: "auto",
                        transition: "width 0.5s ease-in-out",
                        pointerEvents: isIdle ? "auto" : "none",
                        background: "none",
                        display: "block",
                    }}
                /></>)}

        </div>
    );
};