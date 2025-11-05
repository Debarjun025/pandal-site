// src/pages/Admin.jsx
import React from "react";
import Donors from "./Donors"; // default export

export default function Admin() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#7c2d12]">
        Admin Dashboard
      </h1>
      <Donors />
    </div>
  );
}
