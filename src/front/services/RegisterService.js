export const register = async (username, email, password) => {
  const BACKURL = import.meta.env.VITE_BACKEND_URL;

  console.log("Solicitud fetch:", {
    username,
    email,
    password,
  });

  const resp = await fetch(`${BACKURL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.msg || "Registration failed");
  }

  return data;
};
