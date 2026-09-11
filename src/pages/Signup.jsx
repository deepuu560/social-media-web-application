import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";
import { createUser } from "../services/userService";

import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    if (
      !displayName ||
      !username ||
      !email ||
      !password
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName,
      });

      await createUser({
        uid: result.user.uid,
        displayName,
        username,
        email,
      });

      alert("Account created successfully!");

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e)=>setDisplayName(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-6"
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-full font-bold"
        >
          Signup
        </button>

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;