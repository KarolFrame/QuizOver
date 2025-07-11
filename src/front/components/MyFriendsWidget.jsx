// src/front/components/MyFriendsWidget.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Avatars from "./Avatars";

export function MyFriendsWidget() {
  const { store } = useGlobalReducer();
  const [friends] = useState([
    { id: 1, name: "Ana", avatar: "👩" },
    { id: 2, name: "Carlos", avatar: "👨" },
    { id: 3, name: "María", avatar: "👩‍🦱" },
    { id: 4, name: "Juan", avatar: "👨‍🦰" },
  ]);

  const friendList = store.user.friends;
  console.log(friendList);

  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleAddFriend = () => {
    setShowAddFriend(!showAddFriend);
    // Aquí irá la lógica para agregar amigos
  };

  return (
    <div
      className="p-4 rounded-lg mb-6 overflow-hidden bg-primary"
      style={{
        color: "var(--color-white)"
      }}
    >
      <h3 className="text-4xl font-semibold mb-4 text-center">
        My friends
      </h3>
      {friendList.length > 0 && (
        <div>
          <Avatars entries={friendList} displayOrder={false} showDecorations={false} scrollable={true} height="200px" />
        </div>)}
      {friendList.length == 0 && (
        <div className="flex justify-center">
          <p>You don’t have any friends yet :(</p>
        </div>)}

      <div className="flex justify-end">
        <Link to="/my-friends">
          <Button label="See all" variant="accent" />
        </Link>
      </div>
    </div>
  );
}