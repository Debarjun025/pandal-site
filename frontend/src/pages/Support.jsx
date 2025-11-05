import React, { useState } from "react";
import api from "../api";
import { QRCodeCanvas } from "qrcode.react";

export default function Support({ user }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
    note: "",
  });
  const [status, setStatus] = useState("");
  const [proof, setProof] = useState(null);

  const handleOnline = async (e) => {
    e.preventDefault();
    try {
      // ✅ Validate required fields
      if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
        setStatus("⚠️ Please fill in Name, Phone, and Email.");
        return;
      }

      const amountValue = parseFloat(form.amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        setStatus("⚠️ Please enter a valid donation amount.");
        return;
      }

      if (!proof) {
        setStatus("⚠️ Please upload a screenshot of the payment proof.");
        return;
      }

      // ✅ Prepare FormData for file upload
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("phone", form.phone.trim());
      formData.append("email", form.email.trim());
      formData.append("amount", amountValue);
      formData.append("payment_mode", "online");
      formData.append("note", form.note || "");
      formData.append("proof", proof);

      // ✅ API call (depends on user login)
      const endpoint = user ? "/donate" : "/donors";
      await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("✅ Thank you! Your donation was recorded successfully.");

      // Reset form after submit
      setForm({ name: "", phone: "", email: "", amount: "", note: "" });
      setProof(null);
    } catch (err) {
      console.error("Donation error:", err.response?.data || err.message);
      setStatus("❌ Failed to record donation. Please try again.");
    }
  };

  // ✅ Dynamic QR data
  const upiID = "debarjunpaul9@okhdfcbank";
  const receiverName = "Debarjun Paul";

  const qrData =
    form.amount && !isNaN(parseFloat(form.amount))
      ? `upi://pay?pa=${encodeURIComponent(
          upiID
        )}&pn=${encodeURIComponent(receiverName)}&am=${encodeURIComponent(
          form.amount
        )}&cu=INR&tn=${encodeURIComponent(form.note || "Puja Chanda")}`
      : "";

  return (
    <section className="bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold text-[#7c2d12]">
        Support / Donate (Chanda)
      </h2>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {/* ✅ Left side: QR Code */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Online Payment</h3>
          <p className="text-sm mt-2">
            Enter amount → scan QR → complete payment. UPI ID is linked.
          </p>
          <div className="mt-3 flex flex-col items-center">
            {qrData ? (
              <QRCodeCanvas value={qrData} size={200} />
            ) : (
              <div className="text-gray-500">Enter amount to generate QR</div>
            )}
            <div className="mt-2 text-sm">UPI ID: {upiID}</div>
            <div className="text-sm font-semibold">{receiverName}</div>
          </div>
        </div>

        {/* ✅ Right side: Donation form */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Record Donation (Online)</h3>
          <form onSubmit={handleOnline} className="mt-2 space-y-2">
            <input
              className="w-full border p-2 rounded"
              placeholder="Name"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Phone"
              value={form.phone}
              required
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Email"
              type="email"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Amount (INR)"
              type="number"
              value={form.amount}
              required
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
            <div>
              <label
                htmlFor="proof"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Proof (Screenshot)
              </label>
              <input
                id="proof"
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                type="file"
                accept="image/*"
                required
                onChange={(e) => setProof(e.target.files[0])}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#7c2d12] text-white px-4 py-2 rounded"
              >
                Donate (Record)
              </button>
            </div>
          </form>
          {status && <div className="mt-2 text-sm">{status}</div>}
        </div>
      </div>

      <div className="mt-4 p-3 border rounded bg-yellow-50">
        <strong>Cash Donations:</strong> If you donate in cash, inform the admin
        and they can add it manually (Admins → Add cash donation).
      </div>
    </section>
  );
}
