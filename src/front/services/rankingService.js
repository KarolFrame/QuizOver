export const FETCH_RANKING_REQUEST = 'FETCH_RANKING_REQUEST';
export const FETCH_RANKING_SUCCESS = 'FETCH_RANKING_SUCCESS';
export const FETCH_RANKING_FAILURE = 'FETCH_RANKING_FAILURE';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getGlobalRanking = async () => {
  const response = await fetch(`${BACKEND_URL}/ranking/global`);

  if (!response.ok) {
    let errorMessage;
    try {
      const json = await response.json();
      errorMessage = json.message || JSON.stringify(json);
    } catch {
      const text = await response.text();
      errorMessage = text;
    }
    throw new Error(`HTTP ${response.status}: ${errorMessage}`);
  }

  return response.json();
};
