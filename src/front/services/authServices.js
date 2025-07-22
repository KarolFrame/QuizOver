const BACKURL = import.meta.env.VITE_BACKEND_URL;

const STORAGE_KEYS = [
  "jwt-token",
  "user-email",
  "user-id",
  "user-info",
  "user-friends",
];

export const getCurrentUser = () => {
  const token = localStorage.getItem("jwt-token");
  const email = localStorage.getItem("user-email");

  if (!token || !email) return null;

  return { token, email };
};

export const loadSession = () => {
  const user = getCurrentUser(); 

  const userId = localStorage.getItem("user-id");
  const userInfoString = localStorage.getItem("user-info");

  if (!user || !user.token || !user.email || !userId || !userInfoString || userInfoString === "undefined") {
    return null;
  }

  let userInfo = null;

  try {
    userInfo = JSON.parse(userInfoString);
  } catch (e) {
    console.error("Error parsing user info:", e);
    localStorage.removeItem("user-info");
    return null;
  }

  return {
    token: user.token,
    email: user.email,
    user_id: parseInt(userId, 10),
    user_info: userInfo,
  };
};

export const clearLocalStorage = (keys) => {
  keys.forEach(function(key) {
    localStorage.removeItem(key);
  });
}

export const logOut = (options) => {
  clearLocalStorage(STORAGE_KEYS);

  if (options && options.redirectTo) {
    window.location.href = options.redirectTo;
  }
};

export const persistUserSession = (data) => {
  localStorage.setItem("jwt-token", data.token);
  localStorage.setItem("user-email", data.email);
  localStorage.setItem("user-id", data.user_id);
  localStorage.setItem("user-info", JSON.stringify(data.user_info));
  localStorage.setItem("user-friends", JSON.stringify(data.friends));
}

export const Login = async (email, password) => {
  try {
    const resp = await fetch(`${BACKURL}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (resp.status === 401) {
      const data = await resp.json();
      throw new Error(data.msg || "Invalid credentials");
    }

    if (resp.status === 400) {
      throw new Error("Invalid email or password format");
    }

    if (!resp.ok) {
      throw new Error("Unknown error during login");
    }

    const data = await resp.json();
    console.log("Data received in authService (Login):", data);
    persistUserSession(data);

    if (Array.isArray(data.friends)) {
      data.friends = Object.fromEntries(
        data.friends.map(friend => [friend.id, friend])
      );
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

const redirectToLogin = () => {
  clearLocalStorage(STORAGE_KEYS);
  window.location.href = "/login";
}

export const getAuthToken = () => {
  const token = localStorage.getItem("jwt-token");

  if (token) {
    return token;
  } else {
    logOut();
  }
  return;
}

export const fetchBackend = async (url, config) => {
  const token = getAuthToken();

  const response = await fetch(`${BACKURL}${url}`, {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(config.body),
  });

  const jsonResponse = await response.json();

  if (response.ok) {
    return jsonResponse;
  } else if (response.status === 402) {
    logOut();
  } else {
    throw new Error(`Error fetching from backend: ${response.status}`);
  }
};
