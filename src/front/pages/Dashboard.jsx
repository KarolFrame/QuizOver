import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { VideoPet } from "../components/VideoPet.jsx";

export const Dashboard = () => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(true);
  const { store } = useGlobalReducer();

  const currentUserProfile = store.profile;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoIsPlaying(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen md:justify-center pt-2 md:pt-0">
        {!videoIsPlaying && currentUserProfile && (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="flex flex-col items-center justify-center w-full md:w-[50%] h-[70%] gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: 0.2 }}
            >
              <h1 className="text-lg md:text-4xl font-bold text-white pb-10">Are you ready?</h1>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 md:gap-6 max-w-[90%] md:max-w-[80%]"
              style={{ zIndex: 10 }}
            >
              <div className="flex flex-col gap-4 w-full col-span-1 mb-5">
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, x: -500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link to="/game/classic-mode">
                    <motion.img
                      src="/images/classic-button.png"
                      alt="Classic Mode Button"
                      className="w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: -500 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link to="/ranking/global">
                    <motion.img
                      src="/images/ranking.png"
                      alt="Ranking Button"
                      className="w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              </div>

              <div className="flex flex-col gap-4 w-full col-span-2">
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, x: 500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link to="/minigame">
                    <motion.img
                      src="/images/minigame-button.png"
                      alt="MiniGame Button"
                      className="w-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, x: 500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Link to="/edit-profile">
                    <motion.img
                      src="/images/avatarcreation.png"
                      alt="Avatar Creation Button"
                      className="w-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <VideoPet />
        </div>
      </div>
    </>
  );
}