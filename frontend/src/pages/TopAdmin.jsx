// src/pages/TopAdmin.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function TopAdmin({ user }) {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      const res = await api.get('/admins');
      setAdmins(res.data || []);
    } catch (e) {
      console.error(e);
      alert('Failed to load admins');
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!name || !email || !password) return alert('All fields required');
    try {
      await api.post('/admins', { name, email, password });
      setName(''); setEmail(''); setPassword('');
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add admin');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this admin?')) return;
    try {
      await api.delete(`/admins/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete admin');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#7c2d12]">Top Admin Panel</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Existing Admins</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2">{a.id}</td>
                <td className="px-4 py-2">{a.name}</td>
                <td className="px-4 py-2">{a.email}</td>
                <td className="px-4 py-2">{a.role}</td>
                <td className="px-4 py-2">
                  {a.role !== 'top_admin' && (
                    <button onClick={() => handleDelete(a.id)} className="px-2 py-1 rounded bg-red-500 text-white">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Add Admin</h2>
        <form onSubmit={handleAdd} className="space-y-2 max-w-md">
          <input className="w-full p-2 border rounded" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
          <input className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input className="w-full p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          <div>
            <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Add Admin</button>
          </div>
        </form>
      </section>
    </div>
  );
}
