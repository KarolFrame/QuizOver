import { motion } from 'motion/react';
import React from 'react';

export const Lista = ({ entries }) => {
  const defaultEntries = [
    { position: 4, name: 'Player4', score: 1000 },
    { position: 5, name: 'Player5', score: 900 },
    { position: 6, name: 'Player6', score: 800 },
    { position: 7, name: 'Player7', score: 700 },
  ];
  const list = (entries ?? defaultEntries).slice(0, 7);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <ul className="space-y-2">
        {list.map(({ position, name, score, avatar }, index) => (
          <motion.li
            key={position}
            className="flex items-center justify-between bg-bg-light p-2 rounded-lg"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .2, delay: (index + 1) / 4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <span className='text-(--color-white)'>{position}</span>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-white">
                <img src={avatar} />
              </div>
              <span className="text-white font-medium text-sm">{name}</span>
            </div>
            <span className="text-white font-bold text-sm">
              {score.toLocaleString()}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Lista;
