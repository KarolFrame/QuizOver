import React, { useRef, useEffect, useState } from 'react';
import { VideoPet } from './VideoPet.jsx';
import { HomeSelector } from './HomeSelector.jsx';

export const HeaderVideo = () => (
    <video
        className="mx-auto w-full h-auto pointer-events-none"
        src="/video/header_video2.mp4"
        autoPlay
        muted
        playsInline
    />
);

export const LoopingRewindVideo = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const [fadeOut, setFadeOut] = useState(false);
    const [showVideoPet, setShowVideoPet] = useState(false);
    const [showHomeSelector, setShowHomeSelector] = useState(false);
    const [hasFaded, setHasFaded] = useState(false);
    const [isIdle, setIsIdle] = useState(false); // 🔥 nuevo estado para saber si está en idle


    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.play().catch((e) => {
            console.warn("Autoplay error:", e);
        });

        const handleTimeUpdate = () => {
            if (!hasFaded && video.duration - video.currentTime <= 0.6) {
                setFadeOut(true);
                setHasFaded(true);
                setTimeout(() => {
                    setShowVideoPet(true);
                }, 600);
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [hasFaded]);

    return (
        <div className="flex flex-col items-center w-full">
            {showVideoPet ? (
                <div
                    className="flex flex-col items-center w-full transition-all duration-700 ease-in-out"
                    style={{
                        marginBottom: isIdle ? "40px" : "0",
                    }}
                >
                    <VideoPet onIdle={() => setIsIdle(true)} />
                    {isIdle && (
                        <div className="transition-opacity duration-700 opacity-100">
                            <HomeSelector />
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative w-[70%] h-[70%] overflow-hidden">
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        muted
                        playsInline
                        autoPlay
                        className={`
                  w-full h-full object-cover object-center
                  transition-opacity duration-700
                  ${fadeOut ? "opacity-0" : "opacity-100"}
                `}
                    />
                    <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(rgba(35,39,72,0)_40%,rgba(35,39,72,1)_70%,rgba(35,39,72,1)_100%)]" />
                </div>
            )}
        </div>
    );
}      