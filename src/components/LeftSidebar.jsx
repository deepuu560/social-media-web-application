import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function LeftSidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="w-72 h-screen sticky top-0 border-r border-gray-800 p-6 bg-black text-white">

      <h1 className="text-4xl font-bold mb-10">
        𝕏
      </h1>

      <nav className="flex flex-col gap-6 text-xl">

        <Link
          to="/"
          className="hover:text-blue-500 transition"
        >
          🏠 Home
        </Link>

        <Link
          to="/search"
          className="hover:text-blue-500 transition"
        >
          🔍 Search
        </Link>

        <Link
          to="/notifications"
          className="hover:text-blue-500 transition"
        >
          🔔 Notifications
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-500 transition"
        >
          👤 Profile
        </Link>

        <Link
          to="/edit-profile"
          className="hover:text-blue-500 transition"
        >
          ✏️ Edit Profile
        </Link>

        <button
          onClick={handleLogout}
          className="text-left hover:text-red-500 transition"
        >
          🚪 Logout
        </button>

      </nav>

      {auth.currentUser && (
        <div className="absolute bottom-8 left-6 right-6 border-t border-gray-800 pt-4">

          <p className="font-bold">
            {auth.currentUser.displayName}
          </p>

          <p className="text-gray-400 text-sm">
            {auth.currentUser.email}
          </p>

        </div>
      )}

    </div>
  );
}

export default LeftSidebar;