import { AvalancheFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd02Icon } from "@hugeicons/core-free-icons";
import { LogoutButton } from "../components/LogoutButton";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Avatar } from "../components/Profile/Avatar";
import { ExpBar } from "../components/Profile/ExpBar";
import { Level } from "../components/Profile/Level";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getGlobalRanking, getUserProfileById } from "../services/rankingService";

export default function MyProfile() {
  const { userId } = useParams();
  const { store } = useGlobalReducer();
  const [profileUser, setProfileUser] = useState(null);
  const [globalRank, setGlobalRank] = useState("N/A");
  const [rankingLoading, setRankingLoading] = useState(true);
  const [rankingError, setRankingError] = useState(null);

  const currentUserUsername = store.user?.user_info?.userName;
  const currentUserId = store.user?.id;

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
        if (store.user && store.user.id) {
          userData = {
            id: currentUserId,
            username: currentUserUsername,
            friendsCount: store.user.friends?.length || 0,
            currentExp: store.user.experience_points || 0,
            totalExp: store.user.xpForNextLevel || 1000,
            level: store.user.level || 1,
            avatar: store.user.user_info?.avatar || '/default_avatar.png',
          };
        }
      }
      setProfileUser(userData);
    };

    fetchUserProfile();
  }, [userId, store.user, currentUserId, currentUserUsername]);


  useEffect(() => {
    const fetchGlobalAndUserRank = async () => {
      setRankingLoading(true);
      setRankingError(null);
      try {
        const fullRanking = await getGlobalRanking();
        let foundRank = "N/A";
        if (profileUser && fullRanking && fullRanking.length > 0) {
          const userIndex = fullRanking.findIndex(u => u.id === profileUser.id);
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

    if (profileUser) {
      fetchGlobalAndUserRank();
    }
  }, [profileUser]);

  if (!profileUser) {
    return <div style={{ color: "var(--color-white)" }}>Cargando perfil...</div>;
  }

  const parsedUserId = userId ? parseInt(userId, 10) : undefined;
  const isCurrentUserProfile = parsedUserId === currentUserId || (userId === undefined && profileUser.id === currentUserId);

  return (
    <div
      className="mx-auto p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      style={{ color: "var(--color-white)" }}
    >
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <Avatar userId={profileUser.id} />
        <h2
          className="mb-1 text-2xl sm:text-3xl font-extrabold"
          style={{ color: "var(--color-white)" }}
        >
          {profileUser.username}
        </h2>
        <Level userLevel={profileUser.level} />
        {isCurrentUserProfile && (
          <Link to="/edit-profile">
            <Button
              label="Edit Profile"
              variant="ghost"
              size="responsive"
            />
          </Link>
        )}
      </div>
      <ExpBar currentExp={profileUser.currentExp} totalExp={profileUser.totalExp} level={profileUser.level} />

      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div
          className="p-4 sm:p-6 rounded-lg flex flex-col items-center"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <p className="text-sm sm:text-base font-semibold text-var(--color-white)">
            Global Rank
          </p>
          <p className="mt-2 text-lg sm:text-2xl font-bold text-var(--color-white)">
            {/* Muestra el rank calculado o N/A */}
            {rankingLoading ? "Cargando..." : (rankingError ? "Error" : globalRank)}
          </p>
        </div>
        <div
          className="p-4 sm:p-6 rounded-lg flex flex-col items-center"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <p className="text-sm sm:text-base font-semibold text-var(--color-white)">
            Friends
          </p>
          <p className="mt-2 text-lg sm:text-2xl font-bold text-var(--color-white)">
            {profileUser.friendsCount || 0}
          </p>
        </div>
      </div>
      {!isCurrentUserProfile ? (
        <div className="flex gap-3 justify-between">
          <Button label="Add Friend" size="responsive" variant="accent" className="grow" />
        </div>
      ) : (
        <div className="flex justify-end">
          <LogoutButton />
        </div>
      )}
    </div>
  );
}