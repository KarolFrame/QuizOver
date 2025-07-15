import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { VideoPet } from "../components/VideoPet.jsx";
import { GlobalRankingWidget } from "../components/GlobalRankingWidget.jsx";
import { getGlobalRanking } from "../services/rankingService.js";
import { Avatar } from "../components/Profile/Avatar.jsx";
import { ExpBar } from "../components/Profile/ExpBar.jsx";
import { getUserProfileById } from "../services/rankingService.js";

export const Home = () => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(true);
  const { store, dispatch } = useGlobalReducer();
  const [entries, setEntries] = useState(null);
  const [globalRank, setGlobalRank] = useState("N/A");
  const [rankingLoading, setRankingLoading] = useState(true);
  const [rankingError, setRankingError] = useState(null);
  const [profileUser, setProfileUser] = useState(null);

  const currentUserUsername = store.profile?.user_info?.userName;

  const currentUserProfile = store.profile;
  const currentUserId = store.profile.id;
  const userId = store.profile.id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const idFromUrl = userId ? parseInt(userId, 10) : undefined;
      let userData = null;

      if (idFromUrl) {
        try {
          userData = await getUserProfileById(idFromUrl);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        if (store.profile && store.profile.id) {
          userData = {
            id: currentUserId,
            username: currentUserUsername,
            friendsCount: store.profile.friends.length || 0,
            currentExp: store.profile.experience_points || 0,
            totalExp: store.profile.xpForNextLevel || 1000,
            level: store.profile.level || 1,
            avatar: store.profile.user_info?.avatar || '/default_avatar.png',
          };
        }
      }
      setProfileUser(userData);
    };

    fetchUserProfile();
  }, [userId, store.profile, currentUserId, currentUserUsername]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoIsPlaying(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchGlobalAndUserRank = async () => {
      setRankingLoading(true);
      setRankingError(null);
      try {
        const fullRanking = await getGlobalRanking();
        const topFiveData = fullRanking.slice(0, 5);
        const transformedData = topFiveData.map((u, i) => ({
          id: u.id,
          position: i + 1,
          name: u.user_info?.userName || "Anon",
          score: u.experience_points.toLocaleString(),
          avatar: u.user_info?.avatar,
        }));
        setEntries(transformedData);

        let foundRank = "N/A";
        if (currentUserProfile && fullRanking && fullRanking.length > 0) {
          const userIndex = fullRanking.findIndex(u => u.id === currentUserProfile.id);
          if (userIndex !== -1) {
            foundRank = userIndex + 1;
          }
        }
        setGlobalRank(foundRank);
      } catch (error) {
        console.error("Error fetching global ranking:", error);
        setRankingError(error);
        setGlobalRank("N/A");
      } finally {
        setRankingLoading(false);
      }
    };

    if (currentUserProfile) {
      fetchGlobalAndUserRank();
    }
  }, [currentUserProfile]);

  const user = currentUserProfile;

  return (
    <>
      {!videoIsPlaying && currentUserProfile && <div className="flex flex-col items-center justify-center">
        <div
          className="flex flex-col md:flex-row items-center justify-center px-4 max-w-[80%] md:max-w-[50%] gap-4"
          style={{ zIndex: 10 }}
        >
          <motion.div
            className="flex flex-wrap justify-center items-center w-full md:w-[50%] h-[70%] gap-4"
            initial={{ opacity: 0, x: -500 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="w-full flex flex-col items-center justify-center">
              <Avatar avatarUrl={user.user_info?.avatar} globalRanking={globalRank} />
            </div>
            <div>
              <div className="w-full max-w-md mx-auto" style={{ color: "var(--color-white)" }}>
                <ExpBar
                  currentExp={profileUser.currentExp || 0}
                  level={profileUser.level || 1}
                />
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div
                    className="p-4 sm:p-6 rounded-lg flex flex-col items-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <p className="text-sm sm:text-base font-semibold" style={{ color: "var(--color-white)" }}>
                      Global Rank
                    </p>
                    <p className="mt-2 text-lg sm:text-2xl font-bold" style={{ color: "var(--color-white)" }}>
                      {rankingLoading ? "Cargando..." : rankingError ? "Error" : globalRank}
                    </p>
                  </div>
                  <div
                    className="p-4 sm:p-6 rounded-lg flex flex-col items-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <p className="text-sm sm:text-base font-semibold" style={{ color: "var(--color-white)" }}>
                      Friends
                    </p>
                    <p className="mt-2 text-lg sm:text-2xl font-bold" style={{ color: "var(--color-white)" }}>
                      {currentUserProfile.friends.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center w-full md:w-[50%] h-[70%] gap-4"
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <div>
              <Link to="/game/classic-mode">
                <motion.img
                  src="/images/classic-button.png"
                  alt="Classic Mode Button"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </div>
            <div>
              <GlobalRankingWidget entries={entries} />
            </div>
          </motion.div>
        </div>
      </div>}
      <VideoPet />
    </>
  );
};