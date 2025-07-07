export const register = async (email, password) => {
  const BACKURL = import.meta.env.VITE_BACKEND_URL;

  const resp = await fetch(`${BACKURL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await resp.json(); 

  if (!resp.ok) {
    throw new Error(data.msg || "Registration failed");
  }

  return data;
};
