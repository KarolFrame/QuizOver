// src/front/components/GlobalRankingWidget.jsx
import React from "react";
import { Link } from "react-router-dom";
import Avatars from "./Avatars";
// no hace falta importar CSS; index.css ya está incluido en tu bundle

export function GlobalRankingWidget({ entries }) {
  return (
    <div
      className="p-4 rounded-lg mb-6 overflow-hidden"
      style={{
        backgroundColor: "var(--color-info)",
        color: "var(--color-white)",
      }}
    >
      <h3 className="text-4xl font-semibold mb-0 text-center">
        Global Ranking
      </h3>

      <div className="avatar-wrapper">
        <Avatars entries={entries} />
      </div>

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
