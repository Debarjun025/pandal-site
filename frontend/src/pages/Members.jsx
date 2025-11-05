import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Members({ user }) {
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
  const [newMember, setNewMember] = useState({ name: '', email: '', password: '' });
  const [cashDonor, setCashDonor] = useState({ name: '', phone: '', email: '', amount: '', note: '' });

  useEffect(() => {
    fetchAdmins();
    fetchMembers();
    fetchDonors();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/admins');
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await api.get('/users/members');
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDonors = async () => {
    try {
      const res = await api.get('/donors/recent');
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addAdmin = async () => {
    try {
      await api.post('/admins/add', newAdmin);
      fetchAdmins();
      setNewAdmin({ name: '', email: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const setRole = async (userId, role) => {
    try {
      await api.post('/admins/set-role', { userId, role });
      fetchAdmins();
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const deleteAdmin = async (id) => {
    if (!confirm('Delete this admin?')) return;
    try {
      await api.delete(`/admins/${id}`);
      fetchAdmins();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const addMember = async () => {
    try {
      await api.post('/users/add', newMember);
      setNewMember({ name: '', email: '', password: '' });
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const deleteMember = async (id) => {
    if (!confirm('Delete this member?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const addCashDonor = async () => {
    try {
      const pay = { ...cashDonor, amount: parseFloat(cashDonor.amount) };
      await api.post('/donors/cash', pay);
      setCashDonor({ name: '', phone: '', email: '', amount: '', note: '' });
      fetchDonors();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const deleteDonor = async (id) => {
    if (!confirm('Delete this donor record?')) return;
    try {
      await api.delete(`/donors/${id}`);
      fetchDonors();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-xl text-[#7c2d12]">Admins</h3>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          <div>
            <div className="space-y-2">
              {admins.map((a) => (
                <div key={a.id} className="flex justify-between items-center border p-2 rounded">
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-sm text-gray-600">
                      {a.email} • {a.role}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRole(a.id, a.role === 'admin' ? 'top_admin' : 'admin')}
                      className="px-2 py-1 border rounded"
                    >
                      Toggle Role
                    </button>
                    <button
                      onClick={() => deleteAdmin(a.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
