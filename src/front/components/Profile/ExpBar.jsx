import React, { useEffect, useState } from "react";

export const ExpBar = ({ currentExp, totalExp, level }) => {
  const sum = level === 1 ? 0 : (level * 1000);
  const current = currentExp - sum;
  const xpForNext = 1000;

  const xpPercent = (current / xpForNext) * 100;

  return (
    <div className="mb-6 sm:mb-8">
      <p className="mb-2 text-sm sm:text-base font-medium tracking-wide text-white">
        XP: {current} / {xpForNext}
      </p>
      <div className="w-full h-4 sm:h-3 rounded-full overflow-hidden bg-primary">
        <div
          className="h-full transition-width duration-500 rounded-full bg-accent"
          style={{
            width: `${xpPercent}%`,
          }}
        />
      </div>
    </div>
  );
};