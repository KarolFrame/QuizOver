import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import { Button } from "../components/Button";
import { Avatar } from "../components/Profile/Avatar";
import { ExpBar } from "../components/Profile/ExpBar";
import { Level } from "../components/Profile/Level";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getUserProfileById } from "../services/profileService";
import { QuestionsLoader } from "../components/QuestionsLoader/QuestionsLoader.jsx";
import { fetchFriends, addFriend } from '../services/FriendsService.js';
import { MyFriendsWidget } from "../components/MyFriendsWidget.jsx";

export default function UserProfile() {
  const { userId: paramsUserId } = useParams();
  const { store } = useGlobalReducer();
  const [user, setUser] = useState(null);

  const loggedInUserId = store.profile.id
  const userId = (paramsUserId && parseInt(paramsUserId, 10)) || store.profile.id;
  const isCurrentUserProfile = userId === loggedInUserId;
  const friendIds = user?.friendIds || [];
  const isFriend = friendIds.includes(loggedInUserId);
  console.log(isFriend, loggedInUserId, user?.friendIds)

  const refetchUser = async () => {
    const user = await getUserProfileById(userId);
    setUser(user);
  }

  useEffect(() => {
    refetchUser()
  }, [])

  if (!user) {
    return <div className="flex justify-center"><QuestionsLoader /></div>;
  }

  const handleAddFriend = async (friendId) => {
    try {
      const result = await addFriend(friendId);
      await refetchUser();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  }

  return (
    <div className="mx-auto p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl" style={{ color: "var(--color-white)", zIndex: 10 }}>
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <Avatar userId={user.id} globalRanking={user.globalRank} />
        <h2
          className="lilita-one-regular mb-1 text-2xl sm:text-3xl font-extrabold"
          style={{ color: "var(--color-white)" }}
        >
          {user.username}
        </h2>
        <Level userLevel={user.level} />
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
      <ExpBar currentExp={user.currentExp} totalExp={user.totalExp} level={user.level} />

      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div
          className="p-4 sm:p-6 rounded-lg flex flex-col items-center"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <p className="text-sm sm:text-base font-semibold text-var(--color-white)">
            Global Rank
          </p>
          <p className="mt-2 text-lg sm:text-2xl font-bold text-var(--color-white)">
            {user.globalRank}
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
            {user.friendsCount || 0}
          </p>
        </div>
      </div>
      {!isCurrentUserProfile ? (
        isFriend ? <p className="lilita-one-regular text-xl">{user.username} is a friend!</p> :
          <div className="flex gap-3 justify-between">
            <Button label="Add Friend" size="responsive" variant="accent" className="grow" onClick={() => handleAddFriend(userId)} />
          </div>
      ) : (
        <>
          <div className=""><MyFriendsWidget /></div>
          <div className="flex justify-end">
            <LogoutButton />
          </div>
        </>
      )}
    </div>
  );
}