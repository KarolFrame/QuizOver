import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ExpBar } from "../components/Profile/ExpBar";
import { Level } from "../components/Profile/Level";


export default function MyProfile() {
  const user = {
    avatarUrl: "https://placekitten.com/200/200",
    name: "John Doe",
    globalRank: 123,
    friendsCount: 42,
  };
  // 

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
        {/*Nivel*/}
        <Level />
      </div>

      {/*Boton crear avatar*/}
      <Link to="/avatar-creator">
        <Button label="Edit Avatar" variant="info" size="responsive" />
      </Link>

      {/* Barra de experiencia */}

      <ExpBar />


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