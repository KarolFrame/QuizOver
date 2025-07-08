// src/front/pages/GameSelector.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { VideoPet } from "../components/VideoPet";
import { GlobalRankingWidget } from "../components/GlobalRankingWidget";
import { getGlobalRanking } from "../services/rankingService";

export const GameSelector = () => {
  const { store, dispatch } = useGlobalReducer();
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    getGlobalRanking()
      .then(data => {
        const top3 = data.slice(0, 3).map((u, i) => ({
          position: i + 1,
          name:     u.email,
          score:    u.experience_points.toLocaleString()
        }));
        setEntries(top3);
      })
      .catch(() => setEntries(null));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-secondary px-4 gap-13">
      <VideoPet />

      <Link to="/game/classic-mode">
        <motion.img
          src="/images/classic-button.png"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: .5 }}
        />
      </Link>

      {/* — Aquí va el widget de Global Ranking — */}
      <div className="w-full max-w-md mt-8">
        <GlobalRankingWidget entries={entries} />
      </div>
    </div>
  );
};
