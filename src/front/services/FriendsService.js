const BACKURL = import.meta.env.VITE_BACKEND_URL;


export const fetchFriends = async (token) => {
    const res = await fetch(`${BACKURL}/users/friends`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error('Failed to fetch friends');
    return await res.json();
  };
  
  export const postFriend = async (token, friend_id) => {
    const res = await fetch(`${BACKURL}/users/friends`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}`, },
      body: JSON.stringify({ friend_id }),
    });
    if (!res.ok) throw new Error('Failed to add friend');
    return await res.json();
  };

