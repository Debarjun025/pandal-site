import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel({ user }) {
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);
  const [donors, setDonors] = useState([]);

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [newMember, setNewMember] = useState({ name: "", email: "", password: "" });
  const [cashDonor, setCashDonor] = useState({ name: "", phone: "", email: "", amount: "", note: "" });

  const api = axios.create({
    baseURL: "http://localhost:5000/api", // adjust if your backend runs elsewhere
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

  // ================= Fetch Data =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, donorsRes] = await Promise.all([
        api.get("/users"),
        api.get("/donors")
      ]);
      setAdmins(usersRes.data.filter(u => u.role === "admin" || u.role === "top_admin"));
      setMembers(usersRes.data.filter(u => u.role === "user"));
      setDonors(donorsRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // ================= Admins =================
  const addAdmin = async () => {
    try {
      await api.post("/register", { ...newAdmin, role: "admin" });
      setNewAdmin({ name: "", email: "", password: "" });
      fetchData();
    } catch (err) {
      console.error("Error adding admin", err);
    }
  };

  // ================= Members =================
  const addMember = async () => {
    try {
      await api.post("/register", { ...newMember, role: "user" });
      setNewMember({ name: "", email: "", password: "" });
      fetchData();
    } catch (err) {
      console.error("Error adding member", err);
    }
  };

  const deleteMember = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting member", err);
    }
  };

  // ================= Donors =================
  const addCashDonor = async () => {
    try {
      await api.post("/donors", { ...cashDonor, amount: parseFloat(cashDonor.amount), payment_mode: "cash" });
      setCashDonor({ name: "", phone: "", email: "", amount: "", note: "" });
      fetchData();
    } catch (err) {
      console.error("Error adding cash donor", err);
    }
  };

  const deleteDonor = async (id) => {
    try {
      await api.delete(`/donors/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting donor", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* ========== Admins Section ========== */}
      {user?.role === "top_admin" && (
        <section className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-xl text-[#7c2d12]">Admins</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              {admins.map(a => (
                <div key={a.id} className="border p-2 rounded mb-2">
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-sm text-gray-600">{a.email} • {a.role}</div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold">Add Admin (top_admin only)</h4>
              <input className="w-full border p-2 rounded mt-2" placeholder="Name" value={newAdmin.name} onChange={e=>setNewAdmin({...newAdmin, name:e.target.value})} />
              <input className="w-full border p-2 rounded mt-2" placeholder="Email" value={newAdmin.email} onChange={e=>setNewAdmin({...newAdmin, email:e.target.value})} />
              <input className="w-full border p-2 rounded mt-2" type="password" placeholder="Password" value={newAdmin.password} onChange={e=>setNewAdmin({...newAdmin, password:e.target.value})} />
              <button onClick={addAdmin} className="mt-2 bg-[#7c2d12] text-white px-3 py-1 rounded">Add Admin</button>
            </div>
          </div>
        </section>
      )}

      {/* ========== Members Section ========== */}
      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-xl text-[#7c2d12]">Members (Add / Remove)</h3>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div>
            {members.map(m => (
              <div key={m.id} className="flex justify-between items-center border p-2 rounded mb-2">
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-600">{m.email} • {m.role}</div>
                </div>
                {m.role === "user" && (
                  <button onClick={()=>deleteMember(m.id)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                )}
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold">Add Member</h4>
            <input className="w-full border p-2 rounded mt-2" placeholder="Name" value={newMember.name} onChange={e=>setNewMember({...newMember, name:e.target.value})} />
            <input className="w-full border p-2 rounded mt-2" placeholder="Email" value={newMember.email} onChange={e=>setNewMember({...newMember, email:e.target.value})} />
            <input className="w-full border p-2 rounded mt-2" type="password" placeholder="Password" value={newMember.password} onChange={e=>setNewMember({...newMember, password:e.target.value})} />
            <button onClick={addMember} className="mt-2 bg-[#7c2d12] text-white px-3 py-1 rounded">Add Member</button>
          </div>
        </div>
      </section>

      {/* ========== Donations Section ========== */}
      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-xl text-[#7c2d12]">Manage Cash Donations</h3>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div>
            <h4 className="font-semibold">Recent Donations</h4>
            {donors.map(d => (
              <div key={d.id} className="flex justify-between items-center border p-2 rounded mb-2">
                <div>
                  <div className="font-semibold">{d.name} ({d.payment_mode})</div>
                  <div className="text-sm text-gray-600">₹{d.amount} • {new Date(d.created_at).toLocaleString()}</div>
                </div>
                <button onClick={()=>deleteDonor(d.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold">Add Cash Donation</h4>
            <input className="w-full border p-2 rounded mt-2" placeholder="Name" value={cashDonor.name} onChange={e=>setCashDonor({...cashDonor, name:e.target.value})} />
            <input className="w-full border p-2 rounded mt-2" placeholder="Phone" value={cashDonor.phone} onChange={e=>setCashDonor({...cashDonor, phone:e.target.value})} />
            <input className="w-full border p-2 rounded mt-2" placeholder="Email" value={cashDonor.email} onChange={e=>setCashDonor({...cashDonor, email:e.target.value})} />
            <input className="w-full border p-2 rounded mt-2" placeholder="Amount" value={cashDonor.amount} onChange={e=>setCashDonor({...cashDonor, amount:e.target.value})} />
            <textarea className="w-full border p-2 rounded mt-2" placeholder="Note" value={cashDonor.note} onChange={e=>setCashDonor({...cashDonor, note:e.target.value})}></textarea>
            <button onClick={addCashDonor} className="mt-2 bg-[#7c2d12] text-white px-3 py-1 rounded">Add Cash Donation</button>
          </div>
        </div>
      </section>
    </div>
  );
}
