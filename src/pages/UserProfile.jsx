import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getUser } from "../services/userService";
import { subscribeToPosts } from "../services/postService";

import FollowButton from "../components/FollowButton";
import Post from "../components/Post";

function UserProfile() {
  const { uid } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [uid]);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((allPosts) => {
      const userPosts = allPosts.filter(
        (post) => post.uid === uid
      );

      setPosts(userPosts);
    });

    return () => unsubscribe();
  }, [uid]);

  async function loadUser() {
    try {
      const data = await getUser(uid);

      setUser(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Cover */}

      <div className="h-52 bg-gray-800">
        {user.coverURL && (
          <img
            src={user.coverURL}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto">

        <div className="px-6">

          <img
            src={
              user.photoURL
                ? user.photoURL
                : `https://ui-avatars.com/api/?background=1DA1F2&color=fff&name=${encodeURIComponent(
                    user.displayName
                  )}`
            }
            alt=""
            className="w-36 h-36 rounded-full border-4 border-black -mt-16 object-cover"
          />

          <div className="flex justify-between items-center mt-4">

            <div>
              <h1 className="text-3xl font-bold">
                {user.displayName}
              </h1>

              <p className="text-gray-400">
                @{user.username}
              </p>
            </div>

            <FollowButton targetUid={user.uid} />

          </div>

          {user.bio && (
            <p className="mt-5">
              {user.bio}
            </p>
          )}

          <div className="flex gap-8 mt-5 text-gray-400">

            <span>
              <strong className="text-white">
                {user.followers?.length || 0}
              </strong>{" "}
              Followers
            </span>

            <span>
              <strong className="text-white">
                {user.following?.length || 0}
              </strong>{" "}
              Following
            </span>

          </div>

          <hr className="border-gray-800 my-8" />

          <h2 className="text-2xl font-bold mb-6">
            Posts
          </h2>

          {posts.length === 0 ? (
            <div className="text-gray-500">
              No posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onDelete={() => {}}
              />
            ))
          )}

          <div className="my-10">
            <Link
              to="/search"
              className="text-blue-500"
            >
              ← Back to Search
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserProfile;