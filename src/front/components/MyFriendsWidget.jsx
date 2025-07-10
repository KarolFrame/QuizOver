// src/front/components/MyFriendsWidget.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function MyFriendsWidget() {
  // Mock data - más tarde se conectará al backend
  const [friends] = useState([
    { id: 1, name: "Ana", avatar: "👩" },
    { id: 2, name: "Carlos", avatar: "👨" },
    { id: 3, name: "María", avatar: "👩‍🦱" },
    { id: 4, name: "Juan", avatar: "👨‍🦰" },
  ]);

  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleAddFriend = () => {
    setShowAddFriend(!showAddFriend);
    // Aquí irá la lógica para agregar amigos
  };

  return (
    <div
      className="p-4 rounded-lg mb-6 overflow-hidden border"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-white)"
      }}
    >
      <h3 className="text-2xl font-semibold mb-4 text-center">
        My friends
      </h3>

      {/* Lista de amigos */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {friends.map((friend) => (
          <div key={friend.id} className="flex flex-col items-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold"
              style={{
                backgroundColor: "var(--color-info)",
                color: "var(--color-white)",
              }}
            >
              {friend.avatar}
            </div>
            <div 
              className="text-xs mt-1 text-center font-medium"
              style={{ color: "var(--color-white)" }}
            >
              {friend.name}
            </div>
          </div>
        ))}
      </div>

      {/* Botón Add a friend */}
      <div className="flex justify-center">
        <button
          onClick={handleAddFriend}
          className="px-4 py-2 rounded-lg font-medium text-sm"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-white)",
          }}
        >
          + Add a friend
        </button>
      </div>

      {/* Modal/Form para agregar amigo (opcional) */}
      {showAddFriend && (
        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "var(--color-bg-light)" }}>
          <input
            type="text"
            placeholder="Friend's username"
            className="w-full mb-2"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-white)",
              border: "1px solid var(--color-bg-light)",
              height: "40px",
              margin: "0"
            }}
          />
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: "var(--color-info)",
                color: "var(--color-white)",
              }}
            >
              Send
            </button>
            <button
              onClick={() => setShowAddFriend(false)}
              className="px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-white)",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}