// Assuming "/protected" is a private endpoint
export const getMyTasks = async () => {
  export const login = async (username, password) => {
  const BACKURL = `https://ubiquitous-sniffle-jprwv559r64hpq75-3001.app.github.dev/protected`;
  // Retrieve token from localStorage
  const token = localStorage.getItem("jwt-token");

  const resp = await fetch(BACKURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, // ⬅⬅⬅ authorization token
    },
  });

  if (!resp.ok) {
    throw Error("There was a problem in the login request");
  } else if (resp.status === 403) {
    throw Error("Missing or invalid token");
  } else {
    throw Error("Unknown error");
  }

  const data = await resp.json();
  console.log("This is the data you requested", data);
  return data;
};
