const BACKURL = import.meta.env.VITE_BACKEND_URL;

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

export const updateProfile = async (profileData, token) => {
  try {
    const response = await fetch(`${BACKURL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || "Error updating profile.");
    }

    const data = await response.json();
    return data.user_info;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
