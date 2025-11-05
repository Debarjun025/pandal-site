import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    // ✅ Check password confirmation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      const data = { user: res.data.user, token: res.data.token };
      onRegister(data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold text-[#7c2d12]">Register</h3>
      <form onSubmit={submit} className="mt-4 space-y-2">
        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {/* ✅ Confirm Password Field */}
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />
        <button className="w-full bg-[#7c2d12] text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
