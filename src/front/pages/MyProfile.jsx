import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";


export default function MyProfile() {
  const [user, setUser] = useState({
    avatarUrl: "/favicon.ico",
    name: "Mr. Explore",
    level: 12,
    currentXp: 0,
    xpForNext: 1000,
    globalRank: 42,
    friendsCount: 8,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    fetch(import.meta.env.VITE_BACKEND_URL + "/users/experience", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch experience");
        return res.json();
      })
      .then((data) => {
        setUser((prev) => ({
          ...prev,
          currentXp: data.currentXp,
          xpForNext: data.xpForNext,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const xpPercent = Math.round((user.currentXp / user.xpForNext) * 100);

  return (
    <div
      className="mx-auto p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      style={{ color: "var(--color-white)" }}
    >
      {/* Avatar, nombre y nivel */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full mb-3"
          style={{
            border: "3px solid var(--color-info)",
            backgroundColor: "var(--color-background)",
          }}
        />
        <h2
          className="mb-1 text-2xl sm:text-3xl font-extrabold"
          style={{ color: "var(--color-white)" }}
        >
          {user.name}
        </h2>
        <p
          className="text-xs sm:text-sm uppercase tracking-wide"
          style={{ color: "var(--color-info)" }}
        >
          Level {user.level}
        </p>
      </div>
      {/*Boton crear avatar*/}
      <Link to="/avatar-creator">
        <Button label="Edit Avatar" variant="info" size="sm" />
      </Link>

      {/* Barra de experiencia */}
      <div className="mb-6 sm:mb-8">
        <p className="mb-1 text-xs sm:text-sm">
          XP: {user.currentXp} / {user.xpForNext}
        </p>
        <div
          className="w-full h-2 sm:h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          <div
            className="h-full transition-width duration-500"
            style={{
              width: `${xpPercent}%`,
              backgroundColor: "var(--color-accent)",
            }}
          />
        </div>
      </div>

      {/* Estadísticas rápidas */}
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

      {/* Botones de acción */}
      <div className="flex justify-end">
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={() => alert("Mostrar lista de amigos")}
            className="px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium shadow-md text-sm sm:text-base"
            style={{
              backgroundColor: "var(--color-info)",
              color: "var(--color-white)",
            }}
          >
            Show Friends
          </button>
          <button
            onClick={() => alert("Añadir nuevo amigo")}
            className="px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium shadow-md text-sm sm:text-base"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-white)",
            }}
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
}