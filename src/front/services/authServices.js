export const getCurrentUser = () => ({
  token: localStorage.getItem("jwt-token"),
  email: localStorage.getItem("user-email"),
});

export const login = async (email, password) => {
  const BACKURL = import.meta.env.VITE_BACKEND_URL;
  const resp = await fetch(`${BACKURL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (resp.status === 401) {
    const data = await resp.json();
    alert(data.msg);
    throw new Error("Invalid credentials");
  } else if (resp.status === 400) {
    throw new Error("Invalid email or password format");
  } else if (!resp.ok) {
    throw new Error("There was a problem in the login request");
  }

  const data = await resp.json();
  localStorage.setItem("jwt-token", data.token);
  localStorage.setItem("user-email", data.email);

  return data;
};

export const register = async (email, password) => {
  const BACKURL = import.meta.env.VITE_BACKEND_URL;
  const resp = await fetch(`${BACKURL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (resp.status === 400) {
    const data = await resp.json();
    alert(data.msg);
    throw new Error("Missing email or password");
  } else if (resp.status === 409) {
    const data = await resp.json();
    alert(data.msg);
    throw new Error("User already exists");
  } else if (!resp.ok) {
    throw new Error("Registration failed");
  }

  const data = await resp.json();
  alert(data.msg);
  localStorage.setItem("jwt-token", data.token);
  localStorage.setItem("user-email", data.email);

  return data;
};

export const logout = () => {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("user-email");
};
