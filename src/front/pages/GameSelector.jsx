import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { VideoPet } from "../components/VideoPet";
import { GlobalRankingWidget } from "../components/GlobalRankingWidget";
import { MyFriendsWidget } from "../components/MyFriendsWidget";
import { getGlobalRanking } from "../services/rankingService";

export const GameSelector = () => {
  const { store, dispatch } = useGlobalReducer();
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    getGlobalRanking()
      .then(data => {
        const transformedData = data.map((u, i) => ({
          position: i + 1,
          name: u.user_info.userName,
          score: u.experience_points.toLocaleString(),
          avatar: u.user_info.avatar
        }));
        setEntries(transformedData);
      })
      .catch(() => setEntries(null));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 gap-13">
      <VideoPet />
      <Link to="/game/classic-mode">
        <motion.img
          src="/images/classic-button.png"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: .2 }}
        />
      </Link>
      <div className="flex flex-col flex-wrap">
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full max-w-md" >
          <GlobalRankingWidget entries={entries} />
        </div>
        <div className="w-full max-w-md">
          <MyFriendsWidget />
        </div>
      </div>
    </div>
  );
};