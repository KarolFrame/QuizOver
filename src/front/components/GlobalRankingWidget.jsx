import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatars } from "./Avatars.jsx";
import { Button } from "../components/Button.jsx"

export function GlobalRankingWidget({ entries }) {
  const [displayOrder, setDisplayOrder] = useState([1, 2, 3]);

  useEffect(() => {
    setDisplayOrder([1, 2, 3]);
  }, []);

  return (
    <div
      className="mb-6 mx-auto flex flex-col items-center justify-center">
      <div>
        <Avatars entries={entries} inGlobalRankingPage={true} displayOrder={false} showDecorations={false} scrollable={true} height="50%" containerWidth="w-[80%] lg:w-[55%] md:w-[38%]" />
      </div>
      <div className="flex justify-end mt-4">
        <Link to="/ranking/global">
          <Button label="See more!" size="responsive" variant="info" />
        </Link>
      </div>
    </div>
  );
}