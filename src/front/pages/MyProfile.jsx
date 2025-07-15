import { AvalancheFreeIcons } from "@hugeicons/core-free-icons";
import { LogoutButton } from "../components/LogoutButton";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Avatar } from "../components/Profile/Avatar";
import { ExpBar } from "../components/Profile/ExpBar";
import { Level } from "../components/Profile/Level";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getGlobalRanking, getUserProfileById } from "../services/rankingService";
import { QuestionsLoader } from "../components/QuestionsLoader/QuestionsLoader.jsx";
import { fetchFriends, postFriend } from '../services/FriendsService.js';
import { MyFriendsWidget } from "../components/MyFriendsWidget.jsx";

export default function MyProfile() {
  const { userId } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const [profileUser, setProfileUser] = useState(null);
  const [globalRank, setGlobalRank] = useState("N/A");
  const [rankingLoading, setRankingLoading] = useState(true);
  const [rankingError, setRankingError] = useState(null);

  const currentUserUsername = store.profile?.user_info?.userName;
  const currentUserId = store.profile?.id;
  const isFriend = userId in store.profile?.friends;

  console.log(isFriend)
  console.log(store.profile.friends)

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
            friendsCount: store.profile.friends?.length || 0,
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
    fetchFriends()
      .then(data => {
        console.log('Friends list:', data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

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
    return <div className="flex justify-center"><QuestionsLoader /></div>;
  }

  const addFriend = async () => {
    try {
      const response = await postFriend(profileUser.id);
      console.log('Add friend success:', response);
    } catch (error) {
      console.error('Add friend error:', error);
    }

    dispatch({
      type: "ADD_FRIEND",
      payload: {
        position: profileUser.globalRank,
        name: profileUser.username,
        score: profileUser.currentExp,
        avatar: profileUser.avatar,
        id: profileUser.id
      }
    })
  };

  const parsedUserId = userId ? parseInt(userId, 10) : undefined;
  const isCurrentUserProfile = parsedUserId === currentUserId || (userId === undefined && profileUser.id === currentUserId);

  return (
    <div className="mx-auto p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl" style={{ color: "var(--color-white)", zIndex: 10 }}>
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <Avatar userId={profileUser.id} globalRanking={globalRank} />
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
            {rankingLoading ? "" : (rankingError ? "Error" : globalRank)}
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
      {isCurrentUserProfile && <div className="m-5"><MyFriendsWidget /></div>}
      {!isCurrentUserProfile ? (
        isFriend ? <p>{profileUser.username} is a friend!</p> :
          <div className="flex gap-3 justify-between">
            <Button label="Add Friend" size="responsive" variant="accent" className="grow" onClick={addFriend} />
          </div>
      ) : (
        <div className="flex justify-end">
          <LogoutButton />
        </div>
      )}
    </div>
  );
}