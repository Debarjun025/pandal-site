import React, { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);

  // ✅ get token from localStorage
  const pandalUser = JSON.parse(localStorage.getItem("pandal_user"));
  const token = pandalUser?.token;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!user) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-[#7c2d12]">My Profile</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p>
          <span className="font-semibold">Joined:</span>{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
