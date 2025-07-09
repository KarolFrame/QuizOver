import React, { useEffect, useState } from "react";
// import { GetExperienceService } from "../../services/ExperienceService";


export const ExpBar = () => {

  const user = {
    experience_points: 350,
    xpForNext: 1000,
  };

  const xpPercent = Math.min(
    100,
    (user.experience_points / user.xpForNext) * 100
  );


  return (

    <div className="mb-6 sm:mb-8">
      <p className="mb-2 text-sm sm:text-base font-medium tracking-wide text-white">
        XP: {user.experience_points} / {user.xpForNext}
      </p>
      <div
        className="w-full h-4 sm:h-3 rounded-full overflow-hidden bg-secondary"
      >
        <div
          className="h-full transition-width duration-500 rounded-full bg-accent"
          style={{
            width: `${xpPercent}%`,
          }}
        />
      </div>
    </div>
  )
}