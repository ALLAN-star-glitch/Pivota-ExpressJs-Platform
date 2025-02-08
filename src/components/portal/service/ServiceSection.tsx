"use client";

import Link from "next/link";

export default function ServiceSection() {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold">Service Management</h2>
      <p>Offer, update, and manage your services.</p>
      <Link href="/dashboard/services">
        <button className="mt-2 bg-pivotaTeal text-white px-4 py-2 rounded-md">
          Manage Services
        </button>
      </Link>
    </div>
  );
}
