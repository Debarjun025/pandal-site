import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Members from "./pages/Members";
import SocialMedia from "./pages/SocialMedia";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Donors from "./pages/Donors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import TopAdmin from "./pages/TopAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import api, { setToken } from "./api";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("pandal_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user && user.token) setToken(user.token);
    else setToken(null);
  }, [user]);

  const handleLogin = (userData) => {
    localStorage.setItem("pandal_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("pandal_user");
    setUser(null);
    setToken(null);
  };

  // ✅ Define role checks
  const isAdmin =
    user && (user.user.role === "admin" || user.user.role === "top_admin");

  const isTopAdmin = user && user.user.role === "top_admin"; // ✅ FIXED

  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="p-4 max-w-5xl mx-auto">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/social" element={<SocialMedia />} />
          <Route path="/support" element={<Support user={user} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/members"
            element={isAdmin ? <Members user={user} /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/admin"
            element={isAdmin ? <Admin user={user} /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/top-admin"
            element={isTopAdmin ? <TopAdmin user={user} /> : <Navigate to="/login" replace />}
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={<div className="text-center mt-10">Page not found</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
