import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { VideoPet } from "../components/VideoPet.jsx";
import { GlobalRankingWidget } from "../components/GlobalRankingWidget.jsx";
import { MyFriendsWidget } from "../components/MyFriendsWidget.jsx";
import { getGlobalRanking } from "../services/rankingService.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    getGlobalRanking()
      .then(data => {
        const topFiveData = data.slice(0, 5);
        const transformedData = topFiveData.map((u, i) => ({
          id: u.id,
          position: i + 1,
          name: u.user_info?.userName,
          score: u.experience_points.toLocaleString(),
          avatar: u.user_info?.avatar
        }));
        setEntries(transformedData);
      })
      .catch(() => setEntries(null));
  }, []);

  return (<>
    <div className="flex flex-column items-cente justify-center">
      <div className="flex flex-col items-center justify-center px-4 gap-13 max-w-[80%] md:max-w-[50%]" style={{ zIndex: 10, }}>
        <VideoPet />
        <Link to="/game/classic-mode">
          <motion.img
            src="/images/classic-button.png"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: .2 }}
          />
        </Link>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full" >
            <GlobalRankingWidget entries={entries} />
          </div>
          <div className="w-full max-w-md mx-auto">
            <MyFriendsWidget />
          </div>
        </div>
      </div>
    </div>
  </>);
};