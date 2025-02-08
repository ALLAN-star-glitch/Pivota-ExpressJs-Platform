"use client";

import Link from "next/link";

export default function ProfileSection() {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold">Profile</h2>
      <p>Manage your personal information.</p>
      <Link href="/dashboard/profile">
        <button className="mt-2 bg-pivotaTeal text-white px-4 py-2 rounded-md">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
