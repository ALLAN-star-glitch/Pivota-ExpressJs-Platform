"use client";

import Link from "next/link";

export default function PropertySection() {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold">Property Management</h2>
      <p>List, update, and review your properties.</p>
      <Link href="/dashboard/properties">
        <button className="mt-2 bg-pivotaTeal text-white px-4 py-2 rounded-md">
          Manage Properties
        </button>
      </Link>
    </div>
  );
}
