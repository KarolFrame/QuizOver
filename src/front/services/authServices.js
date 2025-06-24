export const login = async (username, password) => {
  const BACKURL = import.meta.env.VITE_BACKEND_URL;
  const resp = await fetch(`${BACKURL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (resp.status === 401) {
    const data = await resp.json();
    alert(data.msg)
    throw "Invalid credentials";
  } else if (resp.status === 400) {
    throw "Invalid email or password format";
  } else if (!resp.ok) {
    throw Error("There was a problem in the login request");
  }
  
  const data = await resp.json();
  // Save your token in the localStorage
  // Also you should set your user into the store using the setItem function
  localStorage.setItem("jwt-token", data.token);

  return data;
};
