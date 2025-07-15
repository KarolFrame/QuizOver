import { fetchBackend } from "./authServices";

export async function ExperienceService(experiencePoints) {

  try {
    return fetchBackend("/users/experience", {
      method: "POST",
      body: { experiencePoints },
    });
  } catch (e) {
    console.error("Network or fetch error:", e);
    throw e; 
  }
}
