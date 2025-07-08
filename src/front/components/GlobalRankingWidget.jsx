import React from "react";
import { Link } from "react-router-dom";
import Avatars from "./Avatars";

export function GlobalRankingWidget({ entries }) {
  return (
    <div
      className="p-4 rounded-lg mb-6"
      style={{
        backgroundColor: "var(--color-info)",
        color: "var(--color-white)",
      }}
    >
      {/* Título */}
      <h3 className="text-lg font-semibold mb-4">Global Ranking</h3>

      {/* Tres primeros puestos */}
      <Avatars entries={entries} />

      {/* Botón “See them all” alineado a la derecha */}
      <div className="flex justify-end mt-4">
        <Link to="/ranking/global">
          <button
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-white)",
            }}
          >
            See them all
          </button>
        </Link>
      </div>
    </div>
  );
}
