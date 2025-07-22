import React, { useRef, useEffect, useState } from 'react';
import { VideoPet } from './VideoPet.jsx';
import { RegisterForm } from './RegisterForm.jsx';
import { motion } from 'motion/react';

export const HeaderVideo = () => (
    <video
        className="mx-auto w-full h-auto pointer-events-none"
        src="/video/header_video2.mp4"
        autoPlay
        muted
        playsInline
    />
);

export const LoopingRewindVideo = ({ videoSrc, handleRegister }) => {
    const videoRef = useRef(null);
    const [fadeOut, setFadeOut] = useState(false);
    const [showVideoPet, setShowVideoPet] = useState(false);
    const [hasFaded, setHasFaded] = useState(false);
    const [isIdle, setIsIdle] = useState(false);


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
        <div className="flex flex-col items-center w-full ">
            {showVideoPet && (
                <div className="justify-center p-4 ">
                    <div className="flex flex-col items-center justify-center gap-0 md:flex-row md:items-center md:justify-center w-full max-w-screen-lg lg:max-w-screen-xl ">
                        <VideoPet onIdle={() => setIsIdle(true)} />
                        {isIdle && (
                            <motion.div
                                initial={{ opacity: 0, x: 500 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: .5, ease: "easeOut" }}
                            >
                                <RegisterForm handleRegister={handleRegister} />
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
            {!showVideoPet && (
                <div className="relative w-[40%] h-[40%] overflow-hidden">
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        muted
                        playsInline
                        autoPlay
                        className={` w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-auto ${fadeOut ? "opacity-0" : "opacity-100"}`}
                        onClick={() => {
                            setShowVideoPet(true);
                        }}
                        style={
                            { zIndex: 10, }}
                    />
                    <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(rgba(35,39,72,0)_40%,rgba(35,39,72,1)_70%,rgba(35,39,72,1)_100%)]" />
                </div>
            )}
        </div>
    );
}      