import { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState(
    auth.currentUser?.displayName || ""
  );

  const [loading, setLoading] = useState(false);

  async function saveProfile() {
    if (!auth.currentUser) return;

    try {
      setLoading(true);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      alert("Profile updated!");

      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-white">

      <div className="w-full max-w-md border border-gray-800 rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <label className="block mb-2">
          Display Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 mb-6"
        />

        <button
          onClick={saveProfile}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-full font-bold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>
  );
}

export default EditProfile;