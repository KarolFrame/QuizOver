export const getAvatarUrl = (avatarFileName) => {
  const BACKURL = import.meta.env.VITE_BACKEND_URL;
  const defaultAvatar = "/favicon.ico";
  if (!avatarFileName) {
    return defaultAvatar;
  }
  return avatarFileName;
};
