import { fetchBackend } from "./authServices";

export const fetchFriends = async () => {
  const data = await fetchBackend('/users/friends', {
    method: 'GET',
  });

  if (Array.isArray(data)) {
    return Object.fromEntries(data.map(f => [f.id, f]));
  }

  return data;
};

export const addFriend = async (friendId) => {

  try {
    return await fetchBackend("/users/friends", {
      method: "POST",
      body: { friend_id: friendId },
    });

  } catch (error) {
    console.error("error adding friend", error);
    throw error; 
  }

};

export const removeFriend = async (friendId) => {
  return await fetchBackend(`/users/friends/${friendId}`, {
    method: 'DELETE',
  });
};


