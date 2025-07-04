import React, { useEffect, useState } from "react"

export const VideoPet = () => {
    const [isIdle, setIsIdle] = useState(false);


    return (
        <>
            {!isIdle ? (
                <video
                    className="mx-auto"
                    src="/video/v_hello.webm"
                    autoPlay
                    muted
                    playsInline
                    style={{
                        width: "50%",
                        height: "auto",
                        pointerEvents: "none",
                        background: "none"
                    }}
                    onEnded={() => setIsIdle(true)}
                />) : (
                <video
                    className="mx-auto"
                    src="/video/v_idle.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: "20%",
                        height: "auto",
                        pointerEvents: "none",
                        background: "none"
                    }}
                />)}
        </>
    )
}