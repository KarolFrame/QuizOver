const BACKURL = import.meta.env.VITE_BACKEND_URL;
import { fetchBackend } from "./authServices";

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${BACKURL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || "Error fetching user profile");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const data = await fetchBackend(`/user/profile`, {
      method: "PUT",
      body:(profileData),
    });
    
    return data.user_info;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
