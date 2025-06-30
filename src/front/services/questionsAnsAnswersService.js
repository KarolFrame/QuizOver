const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getQuestionAndAnswer = async () => {
  const res = await fetch(`${BACKEND_URL}/api/trivia-question`);

  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }

  const data = await res.json();
  return data;
};
