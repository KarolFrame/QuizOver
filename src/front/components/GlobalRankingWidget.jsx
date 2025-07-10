import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatars from "./Avatars";
import { Button } from "../components/Button.jsx"

export function GlobalRankingWidget({ entries }) {
  const [displayOrder, setDisplayOrder] = useState([1, 2, 3]);

  useEffect(() => {
    setDisplayOrder([1, 2, 3]);
  }, []);

  return (
    <div
      className=" bg-primary rounded-lg mb-6 p-4 overflow-hidden">
      <h3 className="text-4xl mt-2 mb-2 text-white font-semibold text-center"> Global Ranking</h3>
      <div>
        <Avatars entries={entries} displayOrder={false} showDecorations={false} scrollable={true} height="200px" />
      </div>
      <div className="flex justify-end mt-4">
        <Link to="/ranking/global">
          <Button label="See more!" size="responsive" variant="info" />
        </Link>
      </div>
    </div>
  );
}