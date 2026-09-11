import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  followUser,
  unfollowUser,
  subscribeToUser,
} from "../services/followService";

function FollowButton({ targetUid }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!auth.currentUser || !targetUid) return;

    const unsubscribe = subscribeToUser(auth.currentUser.uid, (user) => {
      setFollowing(user.following?.includes(targetUid));
    });

    return unsubscribe;
  }, [targetUid]);

  if (!auth.currentUser) return null;

  // Don't show Follow on your own profile
  if (auth.currentUser.uid === targetUid) return null;

  async function handleClick() {
    try {
      if (following) {
        await unfollowUser(auth.currentUser.uid, targetUid);
      } else {
        await followUser(auth.currentUser.uid, targetUid);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`px-5 py-2 rounded-full font-bold ${
        following
          ? "bg-gray-700 text-white"
          : "bg-white text-black"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;