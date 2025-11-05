import { Link } from "react-router-dom";
import logo from "./assets/logo.png"; // ✅ correct path

export default function Navbar({ user, onLogout }) {
  const role = user?.role || user?.user?.role; 
  const isAdmin = role === "admin" || role === "top_admin";

  return (
    <nav className="bg-orange-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Left Side: Logo + Title */}
      <div className="flex items-center space-x-2 font-bold text-2xl">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
        বিবেকানন্দ বয়েজ ক্লাব
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/social">Social Media</Link>
        <Link to="/support">Support</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/members">Members</Link> {/* ✅ Always visible */}

        {/* ✅ Show only if Admin */}
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>

      {/* Right Side: Auth Buttons */}
      <div>
        {user ? (
          <button
            onClick={onLogout}
            className="bg-white text-orange-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-orange-600 px-3 py-1 rounded mr-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 text-black px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
