import React, { useEffect, useState } from 'react';

const spriteSize = { x: 233, y: 177 };

const frames = [
    { name: "down-right", i: 0, j: 2 },
    { name: "look-right", i: 1, j: 2 },
    { name: "look-up", i: 2, j: 2 },
    { name: "up-left", i: 3, j: 2 },
    { name: "down-left", i: 4, j: 2 },
    { name: "look-down", i: 0, j: 3 },
];

export default function SpriteAnimator() {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % frames.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const { i, j } = frames[frameIndex];
    const backgroundPosition = `-${i * spriteSize.x}px -${j * spriteSize.y}px`;

    return (
        <div
            style={{
                width: `${spriteSize.x}px`,
                height: `${spriteSize.y}px`,
                backgroundImage: "url(/sprite.png)",
                backgroundPosition,
                backgroundRepeat: "no-repeat",
                imageRendering: "auto",
            }}
        />
    );
}