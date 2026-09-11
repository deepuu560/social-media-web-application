import { BrowserRouter, Routes, Route } from "react-router-dom";

import LeftSidebar from "./components/LeftSidebar";
import Feed from "./components/Feed";
import RightSidebar from "./components/RightSidebar";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";

function Home() {
  return (
    <div className="flex max-w-7xl mx-auto bg-black min-h-screen">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/search" element={<Search />} />
        <Route path="/user/:uid" element={<UserProfile />} />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;