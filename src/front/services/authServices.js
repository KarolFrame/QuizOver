export const getCurrentUser = () => ({
  token: localStorage.getItem("jwt-token"),
  email: localStorage.getItem("user-email"),
});

export const logout = () => {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("user-email");
};
