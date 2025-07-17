import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { QuestionsLoader } from "./QuestionsLoader/QuestionsLoader";
import { getGlobalRanking } from "../services/rankingService";
import { getUserProfileById } from "../services/profileService";
import { Link } from "react-router-dom";

export const RankingFriendsProfileWidget = () => {
    const { userId } = useParams();
    const { store } = useGlobalReducer();
    const [profileUser, setProfileUser] = useState(null);
    const [globalRank, setGlobalRank] = useState("N/A");
    const [rankingLoading, setRankingLoading] = useState(true);
    const [rankingError, setRankingError] = useState(null);


    useEffect(() => {
        const fetchUserProfile = async () => {
            const idFromUrl = userId ? parseInt(userId, 10) : undefined;

            if (!store.profile) return;

            if (idFromUrl) {
                try {
                    const userData = await getUserProfileById(idFromUrl);
                    console.log("store.profile en /profile:", store.profile);
                    setProfileUser(userData);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            } else {
                console.log("store.profile en /home:", store.profile);
                setProfileUser(store.profile);
            }
        };

        fetchUserProfile();
    }, [userId, store.profile]);

    useEffect(() => {
        const fetchGlobalAndUserRank = async () => {
            setRankingLoading(true);
            setRankingError(null);

            try {
                const fullRanking = await getGlobalRanking();
                let foundRank = "N/A";

                if (profileUser && Array.isArray(fullRanking)) {
                    const userIndex = fullRanking.findIndex(u => u.id === profileUser.id);
                    if (userIndex !== -1) foundRank = userIndex + 1;
                }

                setGlobalRank(foundRank);
            } catch (error) {
                console.error("Error fetching global ranking:", error);
                setRankingError(error);
                setGlobalRank("N/A");
            } finally {
                setRankingLoading(false);
            }
        };

        if (profileUser) {
            fetchGlobalAndUserRank();
        }
    }, [profileUser]);

    if (!profileUser) {
        return <div className="flex justify-center"><QuestionsLoader /></div>;
    }

    const friendsCount =
        Array.isArray(profileUser.friends) ? profileUser.friends.length :
            profileUser.friends && typeof profileUser.friends === "object" ? Object.keys(profileUser.friends).length :
                typeof profileUser.friends === "number" ? profileUser.friends :
                    0;

    return (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 rounded-lg flex flex-col items-center" style={{ backgroundColor: "var(--color-primary)" }}>
                <p className="text-sm sm:text-base font-semibold text-var(--color-white)">
                    Global Rank
                </p>
                <p className="mt-2 text-lg sm:text-2xl font-bold text-var(--color-white)">
                    {rankingLoading ? "" : (rankingError ? "Error" : globalRank)}
                </p>
            </div>
            <Link to={"/my-friends"}>
                <div className="p-4 sm:p-6 rounded-lg flex flex-col items-center" style={{ backgroundColor: "var(--color-primary)" }}>
                    <p className="text-sm sm:text-base font-semibold text-var(--color-white)">
                        Friends
                    </p>
                    <p className="mt-2 text-lg sm:text-2xl font-bold text-var(--color-white)">
                        {friendsCount}
                    </p>
                </div>
            </Link>
        </div>
    );
};
