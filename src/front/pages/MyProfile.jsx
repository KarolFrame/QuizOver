import { AvalancheFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd02Icon } from "@hugeicons/core-free-icons";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Avatar } from "../components/Profile/Avatar";
import { ExpBar } from "../components/Profile/ExpBar";
import { Level } from "../components/Profile/Level";
import useGlobalReducer from "../hooks/useGlobalReducer";


export default function MyProfile() {
  const { store } = useGlobalReducer();
  const usernameFromStore = store.user.user_info.userName;
  const user = {
    username: usernameFromStore,
    globalRank: 1,
    friendsCount: 42,
  };


  return (
    <div
      className="mx-auto p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      style={{ color: "var(--color-white)" }}
    >
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <Avatar />
        <h2
          className="mb-1 text-2xl sm:text-3xl font-extrabold"
          style={{ color: "var(--color-white)" }}
        >
          {user.username}
        </h2>
        <Level />
        <Link to="/edit-profile">
          <Button
            label="Edit Profile"
            variant="ghost"
            size="responsive"
          />
        </Link>
      </div>
      <ExpBar />

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
            {user.friendsCount}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <Button label="Add Friend" size="responsive" variant="accent"
          icon={<HugeiconsIcon icon={UserAdd02Icon} />}
        />
      </div>
    </div>
  );
}