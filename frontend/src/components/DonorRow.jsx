import React from 'react';

export default function DonorRow({ donor }) {
  return (
    <div className="border rounded p-3 flex justify-between items-center">
      <div>
        <div className="font-semibold">{donor.name} <span className="text-sm text-gray-500">({donor.payment_mode})</span></div>
        <div className="text-sm text-gray-600">Amount: ₹{donor.amount} • {new Date(donor.created_at).toLocaleString()}</div>
        <div className="text-sm text-gray-500">Recorded by: {donor.recorded_by_name || 'Public'}</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-[#7c2d12]">₹{donor.amount}</div>
      </div>
    </div>
  );
}
