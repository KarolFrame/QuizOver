import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

export const QuestionAndAnswers = ({ question, option1, option2, image, onAnswer, correct }) => {
  const randomOptions = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const [options] = useState(() => randomOptions([option1, option2]));
  const controls = useAnimation();

  const handleSwipe = (direction) => {
    const selected = direction === "right" ? options[1] : options[0];
    onAnswer(selected, correct);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
      return;
    }
    if (info.offset.x < -100) {
      handleSwipe("left");
      return;
    }
    controls.start({ x: 0 });
  };

  return (
    <>
      <div className="w-[350px] bg-primary rounded-[20px] p-3">
        <h1 className="text-(--color-white) font-[500] text-xl">{question}</h1>
      </div>
      <motion.img
        className="max-w-[350px] w-full h-auto rounded-[20px]"
        src={image}
        drag="x"
        onDragEnd={handleDragEnd}
        animate={controls}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        whileTap={{ cursor: "grabbing" }}
      />
      <div className="flex flex-row justify-between mx-5 text-(--color-white) text-xl gap-5 max-w-[250px]">
        <p className="bg-primary rounded-[20px] p-3 max-w-[500px]">{options[0]}</p>
        <p className="bg-primary rounded-[20px] p-3 max-w-[500px]">{options[1]}</p>
      </div>
    </>
  );
};
