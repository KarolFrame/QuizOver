export const Login = async (email, password) => {
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
  console.log(
    "Data recibida del backend en LoginService (DESPUÉS DE LOGIN):",
    data
  );

  localStorage.setItem("jwt-token", data.token);
  localStorage.setItem("user-email", data.email);
  localStorage.setItem("user-id", data.user_id);
  localStorage.setItem("user-info", JSON.stringify(data.user_info));
  return data;
};
