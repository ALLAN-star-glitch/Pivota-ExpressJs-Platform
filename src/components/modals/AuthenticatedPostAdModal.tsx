import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";



// Define a type for the form data
interface AdFormData {
  title: string;
  description: string;
  location?: string;
  price: number;
  jobCategory?: string;
  serviceType?: string;
}



const PostAdModal =  ({
  isOpen,
  onClose,
  isAuthenticated,
  userRoles,
}: {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  userRoles: string[]
}) => {
  const [step, setStep] = useState<"select" | "form" | "error">("select");
  const [adType, setAdType] = useState<"house" | "job" | "service" | null>(null);
  const router = useRouter();


  // Determine allowed ad types based on roles
  const canPostHouse = userRoles.includes("landlord");
  const canPostJob = userRoles.includes("employer");
  const canPostService = userRoles.includes("serviceProvider");


  const isFreeUser = isAuthenticated && userRoles.length === 1 && userRoles.includes("user");

  // Handle the selection of post type
  const handleSelectPostType = (type: "house" | "job" | "service") => {
    setAdType(type);
    setStep("form"); // Move to the form step
  };

  // Handle form submission
  const handleFormSubmit = (data: AdFormData) => {
    if (!isAuthenticated) {
      setStep("error"); // Show error modal if unauthenticated
      return;
    }
    console.log("Ad posted:", data); // Simulate the form submission process
    onClose(); // Close the modal after submission
  };

  // Redirect to pricing page for upgrading
  const handlePricingRedirect = () => {
    onClose();  // Close the modal
    router.push("/pricing"); // Redirect to pricing page
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className={`relative bg-gradient-to-br from-pivotaTeal via-teal-400 to-pivotaAqua max-w-3xl w-full mx-4 p-12 rounded-lg shadow-lg bg-cover bg-center max-h-[90vh] overflow-y-auto `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button className="text-pivotaTeal text-2xl focus:outline-none" onClick={onClose}>
            &times;
          </button>
        </div>

        {isFreeUser ? (
      <div className="bg-yellow-500 text-black p-4 rounded-lg mb-4 flex items-center justify-between shadow-lg flex-wrap sm:flex-nowrap">
      <div className="flex items-center mb-4 sm:mb-0">
        <Image src="/premium-users.png" alt="Premium Logo" width={50} height={50} className="mr-2" />
        <span className="font-semibold">PREMIUM:</span>
        <span className="ml-2 text-sm sm:text-base">Posting an ad is available only for premium users.</span>
      </div>
      
      <button
        className="bg-pivotaTeal text-white px-6 py-3 rounded-lg hover:scale-105 transition duration-300"
        onClick={handlePricingRedirect} 
      >
        Upgrade
      </button>
    </div>
    
        
        ): step === "select" ? (
          <div className="space-y-6">

             {/* White horizontal line before the title */}
                 <hr className="border-t border-white my-4" />
            <h2 className="md: text-3xl font-semibold text-gray-500 text-center">
              Hi, What would you like to post?
            </h2>

            {canPostHouse &&
            <button
              className="w-full bg-pivotaTeal text-white px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("house")}
            >
              Post a House (Landlord)
            </button>
             }

             {canPostJob && 
            <button
              className="w-full bg-pivotaTeal text-white px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("job")}
            >
              Post a Job (Employer)
            </button>
              }

              {canPostService && 
            <button
              className="w-full bg-pivotaTeal text-white px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("service")}
            >
              Post a Service (Service Provider)
            </button>

              }

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
