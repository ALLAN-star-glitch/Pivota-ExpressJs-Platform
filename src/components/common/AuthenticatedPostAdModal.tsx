import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AdFormData {
  title: string;
  description: string;
  location?: string;
  price: number;
  jobCategory?: string;
  serviceType?: string;
}

const AuthenticatedPostAdModal = ({
  isOpen,
  onClose,
  userRole, // Role of the authenticated user
}: {
  isOpen: boolean;
  onClose: () => void;
  userRole: "landlord" | "employer" | "serviceProvider"; // User role to determine the form
}) => {
  const [adType, setAdType] = useState<"house" | "job" | "service" | null>(null);
  const {data: session} = useSession()

  // Handle form submission
  const handleFormSubmit = (data: AdFormData) => {
    console.log("Ad posted:", data); // Simulate the form submission process
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className="relative bg-gradient-to-b from-pivotaTeal via-black to-pivotaNavy max-w-3xl w-full mx-4 p-8 rounded-lg shadow-lg bg-cover bg-center transform transition-transform duration-500 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button className="text-white text-2xl focus:outline-none" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="space-y-6">

          {/* White horizontal line before the title */}
        <hr className="border-t border-white my-4" />
        <h2 className="text-3xl font-semibold text-white text-center">
          {userRole === "landlord"
            ? `Hi, ${session?.user?.firstName || ""}, Post Your Vacant House`
            : userRole === "employer"
            ? `Hi, ${session?.user?.firstName || ""}, Post Your Vacant Job`
            : `Hi, ${session?.user?.firstName || ""}, Post Your Service`}
        </h2>

          {/* Form for the specific role */}
          <div className="space-y-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white">Title</label>
                <input
                  type="text"
                  className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                  placeholder="Enter the title of your post"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">Description</label>
                <textarea
                  className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                  placeholder="Describe your listing"
                  required
                />
              </div>

              {/* Render fields based on the user role */}
              {userRole === "landlord" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white">Location</label>
                    <input
                      type="text"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter the location"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Price</label>
                    <input
                      type="number"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter the price"
                      required
                    />
                  </div>
                </>
              )}

              {userRole === "employer" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white">Job Category</label>
                    <input
                      type="text"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter job category"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Salary</label>
                    <input
                      type="number"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter the salary"
                      required
                    />
                  </div>
                </>
              )}

              {userRole === "serviceProvider" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white">Service Type</label>
                    <input
                      type="text"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter service type"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Price</label>
                    <input
                      type="number"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter the price"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-pivotaCoral text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={() => handleFormSubmit({} as AdFormData)} // Simulate form submit
                  className="bg-pivotaTeal text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedPostAdModal;
