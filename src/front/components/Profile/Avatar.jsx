import React from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { getAvatarUrl } from "../../services/avatarService.js";
export const Avatar = ({ avatarUrl: propAvatarUrl, className: additionalClassName }) => {
    const { store } = useGlobalReducer();
    const { user } = store;

    const defaultAvatarUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const avatarFileNameFromStore = user?.user_info?.avatar;
    const finalAvatarToRender = propAvatarUrl
        ? propAvatarUrl
        : getAvatarUrl(avatarFileNameFromStore);

    const userName = user?.user_info?.userName;

    const baseClasses = "rounded-full mb-3";
    const combinedClasses = `${baseClasses} ${additionalClassName || "h-20 w-20 sm:h-24 sm:w-24"}`;
    return (
        <img
            src={finalAvatarToRender || defaultAvatarUrl}
            alt={userName ? `${userName}'s avatar` : "Avatar de usuario"}
            className={combinedClasses}
            style={{
                border: "3px solid var(--color-info)",
                backgroundColor: "var(--color-background)",
            }}
        />
    );
};