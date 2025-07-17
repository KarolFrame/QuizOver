const BACKURL = import.meta.env.VITE_BACKEND_URL;


export const getCurrentUser = () => ({
  token: localStorage.getItem("jwt-token"),
  email: localStorage.getItem("user-email"),
});

export const logout = () => {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("user-email");
  localStorage.removeItem("user-id");
  localStorage.removeItem("user-info");
  localStorage.removeItem("user-friends");

};

export const Login = async (email, password) => {
  try{
  const resp = await fetch(`${BACKURL}/token`, {
    method: "POST",
    headers:{ "Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  });

  if (resp.status === 401) {
    const data = await resp.json();
    alert(data.msg || "Credenciales incorrectas");
    throw new Error("Unauthorized");
  }

  if (resp.status === 400) {
    throw new Error("Formato de email o password inválido");
  }

  if (!resp.ok) {
    throw new Error("Error desconocido al intentar iniciar sesión");
  }


  const data = await resp.json();
  console.log("Data recibida en authService (Login):", data);

  if (Array.isArray(data.friends)) {
    data.friends = Object.fromEntries(
      data.friends.map(friend => [friend.id, friend])
    );
  }

  localStorage.setItem("jwt-token", data.token);
  localStorage.setItem("user-email", data.email);
  localStorage.setItem("user-id", data.user_id);
  localStorage.setItem("user-info", JSON.stringify(data.user_info));
  localStorage.setItem("user-friends", JSON.stringify(data.friends));

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

export const getAuthToken = () => {
  // If the token is null, get a token, populate jwt-token and return it.
  const token = localStorage.getItem("jwt-token");

  if (token) { return token; }
  else {
    // dispatch event to say we are logged out
    // redirect to login page
  }
  return 
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
  } else {
    throw `Error fetching from backend: ${response.status}`;
  }
}