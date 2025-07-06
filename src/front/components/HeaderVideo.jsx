
import React, { useRef, useEffect, useState } from 'react';
import { VideoPet } from './VideoPet.jsx';


export const HeaderVideo = () => {
    return (
        <video
            className="mx-auto"
            src="/video/header_video2.mp4"
            autoPlay
            muted
            playsInline
            style={{
                width: "100%",
                height: "auto",
                pointerEvents: "none",
            }}
        />
    );
};

export const LoopingRewindVideo = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const [fadeOut, setFadeOut] = useState(false);
    const [showOtherVideo, setShowOtherVideo] = useState(false);
    const [hasFaded, setHasFaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.play();

        const handleTimeUpdate = () => {
            if (!hasFaded && video.duration - video.currentTime <= 0.6) {
                setFadeOut(true);
                setHasFaded(true);

                setTimeout(() => {
                    setShowOtherVideo(true);
                }, 600);
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [hasFaded]);

    if (showOtherVideo) {
        return <VideoPet />;
    }

    return (
        <div style={{ position: 'relative', width: '70%', height: '70%', overflow: 'hidden' }}>
            {/* SOLO el video se desvanece */}
            <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: fadeOut ? 0 : 1,
                    transition: 'opacity 0.6s ease',
                }}
            />
            {/* El overlay NO hace fade */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        radial-gradient(
                            rgba(35, 39, 72, 0) 40%,
                            rgba(35, 39, 72, 1) 70%,
                            rgba(35, 39, 72, 1) 100%
                        )
                    `,
                    pointerEvents: 'none',
                    zIndex: 1, // Asegura que esté por encima del video
                }}
            />
        </div>
    );
};