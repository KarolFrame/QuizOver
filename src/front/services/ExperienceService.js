export async function ExperienceService(experiencePoints, token) {
  const BACKURL = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${BACKURL}/users/experience`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  
    },
    body: JSON.stringify({ experiencePoints }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Failed to update experience points");
  }
  
  return await response.json();
}
