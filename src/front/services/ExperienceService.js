export async function ExperienceService (userId, experiencePoints, token) {
    const response = await fetch(`/api/users/${userId}/experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,  
      },
      body: JSON.stringify({ experiencePoints }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update experience points");
    }
  
    return await response.json(); //  msg, experiencePoints 
  }
  