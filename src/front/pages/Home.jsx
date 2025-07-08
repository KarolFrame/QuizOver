// src/front/pages/Home.jsx

import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { LoopingRewindVideo } from "../components/HeaderVideo.jsx";
import { HomeSelector } from "../components/HomeSelector.jsx";
import { GlobalRankingWidget } from "../components/GlobalRankingWidget";
import { getGlobalRanking } from "../services/rankingService";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [entries, setEntries] = useState(null);  // <- null para fallback

  useEffect(() => {
    getGlobalRanking()
      .then(data => {
        const top3 = data.slice(0, 3).map((u, i) => ({
          position: i + 1,
          name: u.email,
          score: u.experience_points.toLocaleString()
        }));
        setEntries(top3);
      })
      .catch(err => {
        console.error("Error cargando ranking:", err);
        setEntries(null);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-0 text-center">
        <div className="flex justify-center items-center">
          <LoopingRewindVideo videoSrc="/video/header_video2.mp4" />
        </div>
      </div>

      {/* Selector de modo de juego */}
      <HomeSelector />

      {/* Aquí va el widget de Global Ranking */}
      <GlobalRankingWidget entries={entries} />
    </>
  );
};
