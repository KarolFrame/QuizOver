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
  