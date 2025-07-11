import React, { useEffect } from "react";

export const Level = ({ userLevel }) => {

    const user = {
        level: userLevel,
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
