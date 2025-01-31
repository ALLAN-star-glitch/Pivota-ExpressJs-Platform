"use client"
import Link from 'next/link';
import React from 'react'

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div className="bg-red-100 p-4 rounded-full">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"></path>
              </svg>
            </div>
  
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">Access Denied</h2>
  
            {/* Message */}
            <p className="text-gray-600 mt-2 text-sm">
              You must be logged in to view this page. Please sign in to continue.
            </p>
  
            {/* Login Button */}
            <Link
              href="/login"
              className="mt-6 px-6 py-2 bg-pivotaTeal text-white font-medium rounded-lg shadow-md hover:bg-pivotaAqua transition"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
}
