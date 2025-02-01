import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Define a type for the form data
interface AdFormData {
  title: string;
  description: string;
  location?: string;
  price: number;
  jobCategory?: string;
  serviceType?: string;
}

const PostAdModal = ({
  isOpen,
  onClose,
  isAuthenticated,
}: {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}) => {
  const [step, setStep] = useState<"select" | "form">("select");
  const [adType, setAdType] = useState<"house" | "job" | "service" | null>(null);
  const router = useRouter();

  // Handle the selection of post type
  const handleSelectPostType = (type: "house" | "job" | "service") => {
    setAdType(type);
    setStep("form"); // Move to the form step
  };

  // Handle form submission
  const handleFormSubmit = (data: AdFormData) => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    console.log("Ad posted:", data); // Simulate the form submission process
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className={`relative bg-gradient-to-b from-pivotaTeal via-black to-pivotaNavy max-w-3xl w-full mx-4 p-8 rounded-lg shadow-lg bg-cover bg-center transform transition-transform duration-500 ease-in-out ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button className="text-white text-2xl focus:outline-none" onClick={onClose}>
            &times;
          </button>
        </div>

        {step === "select" ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white text-center">
              What would you like to post?
            </h2>
            <button
              className="w-full bg-pivotaTeal text-white px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("house")}
            >
              Post a House (Landlord)
            </button>
            <button
              className="w-full bg-pivotaTeal text-white px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("job")}
            >
              Post a Job (Employer)
            </button>
            <button
              className="w-full bg-pivotaTeal text-white px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("service")}
            >
              Post a Service (Service Provider)
            </button>

            <div className="text-center mt-4">
              <button
                className="bg-pivotaCoral text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              className="text-sm text-pivotaGold hover:text-pivotaCoral mb-4"
              onClick={() => setStep("select")}
            >
              &larr; Back
            </button>

            <h2 className="text-3xl font-semibold text-white text-center">
              {adType === "house"
                ? "Post Your House (Landlord)"
                : adType === "job"
                ? "Post Your Job (Employer)"
                : "Post Your Service (Service Provider)"}
            </h2>

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

              {adType === "house" && (
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

              {adType === "job" && (
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

              {adType === "service" && (
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
                  onClick={() => handleFormSubmit({ title: "", description: "", price: 0 })}
                  className="bg-pivotaTeal text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAdModal;
