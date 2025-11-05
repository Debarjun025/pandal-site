import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const { token } = useParams(); // ✅ get token from URL
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus("Passwords do not match");
      return;
    }
    try {
      const res = await api.post("/auth/reset-password", { token, password });
      setStatus(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000); // redirect after success
    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold text-[#7c2d12]">Reset Password</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button className="w-full bg-[#7c2d12] text-white p-2 rounded">
          Reset Password
        </button>
      </form>
      {status && <p className="mt-3 text-sm text-green-600">{status}</p>}
    </div>
  );
}
