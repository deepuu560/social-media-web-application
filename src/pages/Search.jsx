import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { getUsers } from "../services/userService";

function Search() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();

      console.log("Users from Firestore:", data);

      // Hide logged-in user
      const otherUsers = data.filter((user) => {
        const userId = user.uid || user.id;
        return userId !== auth.currentUser?.uid;
      });

      setUsers(otherUsers);
      setFilteredUsers(otherUsers);
    } catch (error) {
      console.error(error);
      alert("Failed to load users.");
    }
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);

    const query = value.toLowerCase();

    const results = users.filter((user) => {
      return (
        user.displayName?.toLowerCase().includes(query) ||
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      );
    });

    setFilteredUsers(results);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto">

        <div className="sticky top-0 bg-black border-b border-gray-800 p-5">
          <h1 className="text-3xl font-bold mb-5">
            Search Users
          </h1>

          <input
            type="text"
            placeholder="Search by name, username or email..."
            value={search}
            onChange={handleSearch}
            className="w-full bg-gray-900 border border-gray-700 rounded-full px-5 py-3 outline-none"
          />
        </div>

        <div>
          {filteredUsers.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No users found.
            </div>
          ) : (
            filteredUsers.map((user) => {
              const userId = user.uid || user.id;

              return (
                <Link
                  key={userId}
                  to={`/user/${userId}`}
                  className="flex items-center justify-between p-5 border-b border-gray-800 hover:bg-gray-900 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        user.photoURL
                          ? user.photoURL
                          : `https://ui-avatars.com/api/?background=1DA1F2&color=fff&name=${encodeURIComponent(
                              user.displayName || "User"
                            )}`
                      }
                      alt={user.displayName}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>
                      <h2 className="font-bold text-lg">
                        {user.displayName}
                      </h2>

                      <p className="text-gray-400">
                        @{user.username}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span className="text-blue-500 font-semibold">
                    View Profile →
                  </span>
                </Link>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default Search;