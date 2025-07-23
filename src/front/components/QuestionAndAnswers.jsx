import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";

export const QuestionAndAnswers = ({ question, option1, option2, image, onAnswer, correct }) => {
  const randomOptions = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const [options] = useState(() => randomOptions([option1, option2]));
  const controls = useAnimation();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);

  const handleSwipe = async (direction) => {
    const selected = direction === "right" ? options[1] : options[0];
    const toX = direction === "right" ? 300 : -300;
    const toRotate = direction === "right" ? 20 : -20;

    await controls.start({
      x: toX,
      y: 100,
      rotate: toRotate,
      opacity: 0,
      transition: { duration: 0.2 },
    });

    onAnswer(selected, correct);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    } else {
      controls.start({ x: 0, rotate: 0 });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handleSwipe("left");
      } else if (e.key === "ArrowRight") {
        handleSwipe("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options]);

  return (
    <>
      <div className="bg-primary rounded-[20px] p-3">
        <h1 className="md:p-5 p-2  w-full text-white font-[500] text-xl">{question}</h1>
      </div>

      <motion.img
        className="rounded-[20px]
        max-w-[350px] md:max-w-[500px] lg:max-w-[700px]
        max-h-[200px] md:max-h-[300px] lg:max-h-[400px] p-3"
        src={image}
        drag="x"
        style={{ x, rotate }}
        onDragEnd={handleDragEnd}
        animate={controls}
        dragConstraints={{ left: 0, right: 0, bottom: 0 }}
        dragElastic={0.7}
        whileTap={{ cursor: "grabbing" }}
      />
      <span className="text-white">Swipe To answer!</span>

      <div className=" w-90 flex flex-row mx-5 text-white) text-xl gap-5">
        <p className="bg-info w-full rounded-[20px] p-2 flex-1 flex items-center justify-center text-center w-[160px]">
          {options[0]}
        </p>
        <p className="bg-yellow rounded-[20px] p-2 flex-1 flex items-center justify-center text-center w-[160px]">
          {options[1]}
        </p>
      </div>
    </>
  );
};
