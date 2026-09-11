function ProfileHeader({ user }) {
  return (
    <div className="text-white">

      {/* Cover */}
      <div className="h-52 bg-gray-700">
        {user.coverURL && (
          <img
            src={user.coverURL}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="px-6">

        {/* Profile Picture */}
        <div className="-mt-16">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-black object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-black bg-gray-600 flex items-center justify-center text-5xl">
              👤
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold mt-4">
          {user.displayName}
        </h1>

        <p className="text-gray-400">
          @{user.username}
        </p>

        <p className="mt-4">
          {user.bio || "No bio yet"}
        </p>

      </div>

    </div>
  );
}

export default ProfileHeader;