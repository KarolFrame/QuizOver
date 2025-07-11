import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { getAvatarUrl } from "../../services/avatarService.js";
import { getUserProfileById } from "../../services/rankingService.js";

export const Avatar = ({ avatarUrl: propAvatarUrl, className: additionalClassName, userId }) => {
    const { store } = useGlobalReducer();
    const { user } = store;
    const [fetchedAvatarUrl, setFetchedAvatarUrl] = useState(null);
    const [fetchedUserName, setFetchedUserName] = useState(null);

    const defaultAvatarUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const avatarFileNameFromStore = user?.user_info?.avatar;
    const userNameFromStore = user?.user_info?.userName;

    useEffect(() => {
        const fetchAvatarForId = async () => {
            if (userId) {
                try {
                    const userData = await getUserProfileById(userId);
                    if (userData && userData.avatar) {
                        setFetchedAvatarUrl(getAvatarUrl(userData.avatar));
                    } else {
                        setFetchedAvatarUrl(defaultAvatarUrl);
                    }
                    setFetchedUserName(userData?.username);
                } catch (error) {
                    console.error("Error fetching avatar for userId:", userId, error);
                    setFetchedAvatarUrl(defaultAvatarUrl);
                    setFetchedUserName("Usuario Desconocido");
                }
            } else {
                setFetchedAvatarUrl(null);
                setFetchedUserName(null);
            }
        };

        fetchAvatarForId();
    }, [userId]);

    let finalAvatarToRender;
    let finalUserName;

    if (propAvatarUrl) {
        finalAvatarToRender = propAvatarUrl;
        finalUserName = fetchedUserName || userNameFromStore || "Usuario";
    } else if (userId) {
        finalAvatarToRender = fetchedAvatarUrl;
        finalUserName = fetchedUserName || "Usuario";
    } else {
        finalAvatarToRender = getAvatarUrl(avatarFileNameFromStore);
        finalUserName = userNameFromStore || "Usuario";
    }

    const baseClasses = "rounded-full mb-3";
    const combinedClasses = `${baseClasses} ${additionalClassName || "h-20 w-20 sm:h-24 sm:w-24"}`;

    return (
        <img
            src={finalAvatarToRender || defaultAvatarUrl}
            alt={finalUserName ? `Avatar de ${finalUserName}` : "Avatar de usuario"}
            className={combinedClasses}
            style={{
                border: "3px solid var(--color-info)",
                backgroundColor: "var(--color-background)",
            }}
        />
    );
};