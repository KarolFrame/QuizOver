import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import Avatars from "./Avatars";
import { FingerPrintAddIcon } from "@hugeicons/core-free-icons";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export function MyFriendsWidget() {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    fetch(`${backendUrl}/users/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch friends");
        }
        return res.json();
      })
      .then((data) => {
        const transformedData = data.map((friend) => {
          return {
            id: friend.id,
            name: friend.user_info.userName,
            avatar: friend.user_info.avatar,
          }
        })
        setFriendList(transformedData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading friends...</div>;
  }

  if (error) {
    return <div>Error loading friends: {error}</div>;
  }

  return (
    <div
      className="p-4 rounded-lg mb-6 overflow-hidden bg-primary"
      style={{
        color: "var(--color-white)",
      }}
    >
      <h3 className="text-4xl font-semibold mb-4 text-center">My friends</h3>
      {friendList.length > 0 ? (
        <div>
          <Avatars
            entries={friendList}
            displayOrder={false}
            showDecorations={false}
            scrollable={true}
            height="200px"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <p>You don’t have any friends yet :(</p>
        </div>
      )}
      <div className="flex justify-end">
        <Link to="/my-friends">
          <Button label="See all" variant="accent" />
        </Link>
      </div>
    </div>
  );
}
