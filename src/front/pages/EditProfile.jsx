import { AvatarCreatorQO } from "../components/AvatarCreatorQO";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Button } from '../components/Button';
import { updateProfile } from '../services/profileService';
import { Avatar } from '../components/Profile/Avatar';

export const EditProfile = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const currentUserInfo = store?.user?.user_info;
    const currentToken = store?.auth?.token;

    const [formData, setFormData] = useState({
        userName: '',
        avatar: '',
        birthday: '',
        genre: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isCreatingAvatar, setIsCreatingAvatar] = useState(false);

    useEffect(() => {
        if (currentUserInfo) {
            setFormData({
                userName: currentUserInfo.userName || '',
                avatar: currentUserInfo.avatar || '',
                birthday: currentUserInfo.birthday ? new Date(currentUserInfo.birthday).toISOString().split('T')[0] : '',
                genre: currentUserInfo.genre || '',
            });
        }
    }, [currentUserInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAvatarExportedFromCreator = (avatarUrl) => {
        setFormData(prevData => ({
            ...prevData,
            avatar: avatarUrl
        }));
        setIsCreatingAvatar(false);
        setSuccessMessage("Avatar created! Remember to click 'Save Changes' to update your profile.");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (!currentToken) {
            setError("No token found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const updatedUserInfo = await updateProfile(formData, currentToken);

            dispatch({
                type: 'UPDATE_USER_INFO',
                payload: updatedUserInfo
            });

            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => {
                navigate('/profile');
            }, 1500);

        } catch (err) {
            console.error("Failed to update profile:", err);
            setError(err.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (!currentUserInfo) {
        return (
            <div className="flex justify-center items-center h-screen" style={{ color: "var(--color-white)" }}>
                <p>Loading profile data or no user info available. Please ensure you are logged in.</p>
                <Button label="Go to Login" onClick={() => navigate('/login')} />
            </div>
        );
    }

    return (
        <>
            {!isCreatingAvatar ? (
                <div className="mx-auto p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl" style={{ color: "var(--color-white)" }}>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">Edit Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <Avatar avatarUrl={formData.avatar} className="w-24 h-24 rounded-full border-2 border-primary-500" />
                            <Button label="Create Avatar" onClick={() => setIsCreatingAvatar(true)} />
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium">
                                Username
                            </label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md shadow-sm p-2"
                                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
                            />
                        </div>

                        <div>
                            <label htmlFor="birthday" className="block text-sm font-medium">
                                Birthday
                            </label>
                            <input
                                type="date"
                                id="birthday"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md shadow-sm p-2"
                                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
                            />
                        </div>

                        <div>
                            <label htmlFor="genre" className="block text-sm font-medium">
                                Genre
                            </label>
                            <select
                                id="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md shadow-sm p-2"
                                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
                            >
                                <option value="">Select Genre</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

                        <div className="flex justify-between gap-4 mt-8">
                            <Button
                                label="Cancel"
                                variant="ghost"
                                size="responsive"
                                onClick={() => navigate('/profile')}
                                type="button"
                            />
                            <Button
                                label={loading ? "Updating..." : "Save Changes"}
                                variant="accent"
                                size="responsive"
                                type="submit"
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <AvatarCreatorQO
                    desactivate={() => setIsCreatingAvatar(false)}
                    onAvatarExportedCallback={handleAvatarExportedFromCreator}
                />
            )}
        </>
    );
};
