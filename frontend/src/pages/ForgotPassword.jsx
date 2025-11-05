import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Password reset link sent to your email.");

      // Redirect after 5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h3 className="text-xl font-semibold text-[#7c2d12]">Forgot Password</h3>

      {message && (
        <p className="text-green-600 mt-2">
          {message} <br />
          Redirecting to login in 5 seconds...
        </p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#7c2d12] text-white p-2 rounded hover:bg-[#5a1f0d]"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
