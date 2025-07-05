import React, { useRef, useEffect, useState } from 'react';

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
            }}></video>


    )
}


export const LoopingRewindVideo = ({ videoSrc, overlayColor = 'rgba(35, 39, 72, 0.1)' }) => {
    const videoRef = useRef(null);
    const [reversing, setReversing] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 1.5;
        video.play();

        const handleTimeUpdate = () => {
            if (!reversing && video.currentTime >= video.duration) {
                setReversing(true);
                rewindVideo();
            }
        };

        const rewindVideo = () => {
            const rewind = setInterval(() => {
                if (video.currentTime > 0.1) {
                    video.currentTime -= 0.1;
                } else {
                    clearInterval(rewind);
                    setReversing(false);
                    video.play();
                }
            }, 10);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [reversing]);

    return (
        <div style={{ position: 'relative', width: '70%', height: '70%', overflow: 'hidden' }}>
            <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: "center"
                }}
            />
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
                }}
            />
        </div>
    );
};

