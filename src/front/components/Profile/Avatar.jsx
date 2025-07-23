import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { getAvatarUrl } from "../../services/avatarService.js";
import { getUserProfileById } from "../../services/profileService";

export const Avatar = ({ avatarUrl: propAvatarUrl, className: additionalClassName, userId, globalRanking = 5 }) => {
    const [showDecorations, setShowDecorations] = useState(false);
    const borderImages = {
        1: '/images/borders/border1.png',
        2: '/images/borders/border2.png',
        3: '/images/borders/border3.png',
    };
    const { store } = useGlobalReducer();
    const { user } = store;
    const [fetchedAvatarUrl, setFetchedAvatarUrl] = useState(null);
    const [fetchedUserName, setFetchedUserName] = useState(null);

    const defaultAvatarUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const avatarFileNameFromStore = user?.user_info?.avatar;
    const userNameFromStore = user?.user_info?.userName;

    const _chechkUserId = async () => {
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
    }

    useEffect(() => {
        const fetchAvatarForId = async () => {
            _chechkUserId();
        };

        fetchAvatarForId();
    }, [userId]);

    useEffect((() => {
        if (globalRanking < 4)
            setShowDecorations(true);
    }), [globalRanking]);

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
        <div className={`relative ${additionalClassName || "h-32 w-32 sm:h-36 sm:w-36"} mb-3 flex items-center justify-center`}>
            <img
                src={finalAvatarToRender || defaultAvatarUrl}
                alt={finalUserName ? `Avatar de ${finalUserName}` : "Avatar de usuario"}
                className={`${baseClasses} h-[100%] w-[100%] object-cover`}
                style={{
                    // border: "3px solid var(--color-info)",
                    backgroundColor: "var(--color-background)",
                }}
            />
            {showDecorations && borderImages[globalRanking] && (
                <img
                    src={borderImages[globalRanking]}
                    alt={`Border for position ${globalRanking}`}
                    className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                />
            )}
        </div>
    );
};