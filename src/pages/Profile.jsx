import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import ProfilePosts from "../components/ProfilePosts";

import { auth } from "../firebase";
import { subscribeToUser } from "../services/followService";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = subscribeToUser(
      auth.currentUser.uid,
      (data) => {
        setUser(data);
      }
    );

    return unsubscribe;
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex max-w-7xl mx-auto bg-black min-h-screen text-white">

      <LeftSidebar />

      <main className="w-full md:w-1/2 border-r border-gray-800">

        {/* Cover */}
        <div className="h-48 bg-gray-800">
          {user.coverURL && (
            <img
              src={user.coverURL}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="px-6">

          <div className="-mt-16">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-32 h-32 rounded-full border-4 border-black object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-black flex items-center justify-center text-5xl">
                👤
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between items-center">

            <div>
              <h1 className="text-3xl font-bold">
                {user.displayName}
              </h1>

              <p className="text-gray-500">
                @{user.username}
              </p>

              <p className="text-gray-400 mt-2">
                {user.email}
              </p>

              {user.bio && (
                <p className="mt-3">
                  {user.bio}
                </p>
              )}
            </div>

            <Link
              to="/edit-profile"
              className="border border-gray-600 px-5 py-2 rounded-full hover:bg-gray-900"
            >
              Edit Profile
            </Link>

          </div>

          <div className="flex gap-8 mt-6">

            <div>
              <span className="font-bold">
                {user.following?.length || 0}
              </span>{" "}
              <span className="text-gray-500">
                Following
              </span>
            </div>

            <div>
              <span className="font-bold">
                {user.followers?.length || 0}
              </span>{" "}
              <span className="text-gray-500">
                Followers
              </span>
            </div>

          </div>

        </div>

        <ProfilePosts />

      </main>

      <RightSidebar />

    </div>
  );
}

export default Profile;