// Assuming "/protected" is a private endpoint
export const getMyTasks = async () => {
  const BACKURL = `${import.meta.env.VITE_BACKEND_URL}/protected`;
  // Retrieve token from localStorage
  const token = localStorage.getItem("jwt-token");

  const resp = await fetch(BACKURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token, // ⬅⬅⬅ authorization token
    },
  });

  if (!resp.ok) {
    throw Error("There was a problem in the login request");
  } 
  const data = await resp.json();
  console.log("This is the data you requested", data);
  return data;
};
