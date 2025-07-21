import { motion } from "framer-motion";

const SPRITE_WIDTH = 650;
const SPRITE_HEIGHT = 505;
const SPRITE_COLUMNS = 5;

const getSpritePosition = (index) => {
    const col = index % SPRITE_COLUMNS;
    const row = Math.floor(index / SPRITE_COLUMNS);
    return `-${col * SPRITE_WIDTH}px -${row * SPRITE_HEIGHT}px`;
};

export const AnswerAnimReaction = ({ frameIndex, delay = 0 }) => {
    const isMobile = window.innerWidth < 768;
    const targetScale = isMobile ? .2 : 0.5;

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0,
                y: "100vh",
            }}
            animate={{
                opacity: 1,
                scale: targetScale,
                y: "30vh",
            }}
            transition={{
                duration: .2,
                delay,
                ease: "easeOut",
            }}
            style={{
                position: "absolute",
                width: SPRITE_WIDTH,
                height: SPRITE_HEIGHT,
                backgroundImage: "url(/images/img_spriteshet.png)",
                backgroundPosition: getSpritePosition(frameIndex),
                backgroundSize: `${SPRITE_COLUMNS * SPRITE_WIDTH}px auto`,
                pointerEvents: "none",
                zIndex: 1,
            }}
        />
    );
};
