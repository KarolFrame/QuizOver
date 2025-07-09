import React, { useEffect } from "react";
// import { useGlobalContext } from "../../hooks/useGlobalReducer";

export const Level = () => {

    const user = {
        level: 5,
    };

    return (
        <p
            className="text-xs sm:text-sm uppercase tracking-wide"
            style={{ color: "var(--color-info)" }}
        >
            Level {user.level ?? "Loading..."}
        </p>
    );
};
