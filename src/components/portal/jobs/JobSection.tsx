"use client";

import Link from "next/link";

export default function JobSection() {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold">Job Management</h2>
      <p>Post, update, and manage your job listings.</p>
      <Link href="/dashboard/jobs">
        <button className="mt-2 bg-pivotaTeal text-white px-4 py-2 rounded-md">
          Manage Jobs
        </button>
      </Link>
    </div>
  );
}
