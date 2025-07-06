import React, { useEffect, useState } from "react";

export const VideoPet = () => {
    const [isIdle, setIsIdle] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setHasMounted(true), 10);
        const moveTimer = setTimeout(() => setMoveToTop(true), 50);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(moveTimer);
        };
    }, []);

    return (
        <div
            className={`
                absolute flex justify-center w-full
                transition-all duration-700
                ${hasMounted ? 'opacity-100' : 'opacity-0'}
                ${moveToTop ? 'items-start' : 'items-center'}
                ${isIdle ? 'h-[150px]' : 'h-[200px]'}
            `}
        >
            <video
                src={isIdle ? "/video/v_idle.webm" : "/video/v_hello.webm"}
                autoPlay
                muted
                playsInline
                loop={isIdle}
                onEnded={() => setIsIdle(true)}
                className={`
                    pointer-events-none bg-transparent
                    transition-all duration-500
                    ${isIdle ? 'w-1/5' : 'w-1/2'}
                `}
            />
        </div>
    );
};
