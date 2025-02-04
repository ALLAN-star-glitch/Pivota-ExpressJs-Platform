"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image"; // Import Image for logo

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
  userRoles,
}: {
  isOpen: boolean;
  onClose: () => void;
  userRoles: string[];
}) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<AdFormData>({
    title: "",
    description: "",
    location: "",
    price: 0,
    jobCategory: "",
    serviceType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value, // Ensure price is a number
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ad posted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  // Determine the user role (can be multiple roles, choose the most relevant one for modal display)
  const userRole =
    userRoles.includes("landlord")
      ? "landlord"
      : userRoles.includes("employer")
      ? "employer"
      : userRoles.includes("serviceProvider")
      ? "serviceProvider"
      : "user"; // Default to "user" if none of the premium roles are present

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className="relative bg-gradient-to-b from-pivotaTeal via-black to-pivotaNavy max-w-3xl w-full mx-4 p-8 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
          &times;
        </button>

        {/* Free User Notification Banner */}
        {userRole === "user" && (
          <div className="bg-yellow-500 text-black p-4 rounded-lg mb-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center">
              <Image src="/premium-users.png" alt="Premium Logo" width={50} height={50} className="mr-2" />
              <span className="font-semibold">PREMIUM:</span>
              <span className="ml-2">Posting an ad is available only for premium users.</span>
            </div>
            <button
              className="bg-pivotaTeal text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-300"
              onClick={() => window.location.href = "/upgrade"} // Replace with actual upgrade URL
            >
              Upgrade
            </button>
          </div>
        )}

        {/* Full Form for Premium Users */}
        {userRole !== "user" && (
          <>
            <h2 className="text-3xl font-semibold text-white text-center">
              {userRole === "landlord"
                ? `Hi, ${session?.user?.firstName || ""}, Post Your Vacant House`
                : userRole === "employer"
                ? `Hi, ${session?.user?.firstName || ""}, Post Your Vacant Job`
                : userRole === "serviceProvider"
                ? `Hi, ${session?.user?.firstName || ""}, Post Your Service`
                : `Hi, ${session?.user?.firstName || ""}, Post Your Ad`}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-white">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
                  placeholder="Enter the title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
                  placeholder="Describe your listing"
                  required
                />
              </div>

              {userRole === "landlord" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
                      placeholder="Enter the location"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
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
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handleChange}
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
                      placeholder="Enter job category"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Salary</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
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
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
                      placeholder="Enter service type"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white"
                      placeholder="Enter the price"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-pivotaCoral text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition duration-300"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-pivotaTeal text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthenticatedPostAdModal;
