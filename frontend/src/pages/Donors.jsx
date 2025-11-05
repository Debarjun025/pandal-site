// src/pages/Donors.jsx
import React, { useEffect, useState } from "react";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]); // ✅ for search results
  const [search, setSearch] = useState(""); // ✅ search query

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("online");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  // ✅ Extract token from pandal_user object
  const pandalUser = JSON.parse(localStorage.getItem("pandal_user"));
  const token = pandalUser?.token;

  // Fetch recent donors
  const fetchDonors = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/donors/recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const donorsList = data.donors || [];
      setDonors(donorsList);
      setFilteredDonors(donorsList); // ✅ initialize filtered list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // ✅ Handle search filter
  useEffect(() => {
    if (!search.trim()) {
      setFilteredDonors(donors);
    } else {
      const lower = search.toLowerCase();
      setFilteredDonors(
        donors.filter(
          (d) =>
            d.name?.toLowerCase().includes(lower) ||
            d.email?.toLowerCase().includes(lower) ||
            d.phone?.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, donors]);

  // Add donor
  const handleAddDonor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("amount", amount);
      formData.append("payment_mode", paymentMode);
      formData.append("note", note);
      if (file) formData.append("proof", file);

      const res = await fetch("http://localhost:4000/api/donors", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert(`Donor added: ${data.donor?.name || "Unknown"}`);
        fetchDonors();
      } else {
        alert(`Error: ${data.error || "Failed to add donor"}`);
      }

      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setAmount("");
      setPaymentMode("online");
      setNote("");
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete donor (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/donors/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("Deleted successfully");
        fetchDonors();
      } else {
        alert(`Error: ${data.error || "Failed to delete donor"}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#7c2d12]">Donors</h2>

      {/* ✅ Search Bar */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search donors by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* Add Donor Form */}
      <form
        onSubmit={handleAddDonor}
        className="bg-white shadow p-4 rounded space-y-4"
      >
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded flex-1"
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          >
            <option value="online">Online</option>
            <option value="cash">Cash</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded flex-1"
            accept="image/*"
          />
        </div>
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-[#7c2d12] text-white px-4 py-2 rounded hover:bg-[#a0411d]"
        >
          Add Donor
        </button>
      </form>

      {/* Donors Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#f3e3dc]">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Payment Mode</th>
              <th className="border px-2 py-1">Note</th>
              <th className="border px-2 py-1">Proof</th>
              <th className="border px-2 py-1">Recorded By</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <tr key={donor.id}>
                  <td className="border px-2 py-1">{donor.name}</td>
                  <td className="border px-2 py-1">{donor.phone}</td>
                  <td className="border px-2 py-1">{donor.email}</td>
                  <td className="border px-2 py-1">{donor.amount}</td>
                  <td className="border px-2 py-1">{donor.payment_mode}</td>
                  <td className="border px-2 py-1">{donor.note}</td>
                  <td className="border px-2 py-1">
                    {donor.proof ? (
                      <img
                        src={`http://localhost:4000${donor.proof}`}
                        alt="Proof"
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="border px-2 py-1">
                    {donor.recorded_by_name || "—"}
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDelete(donor.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No donors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
