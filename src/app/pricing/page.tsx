"use client";

import RoleSelectionModal from "@/components/modals/RoleSelectionModal";
import { useState } from "react";
import { AiOutlineUser,AiOutlineArrowLeft} from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller, FieldError, FieldValues } from "react-hook-form";
import Image from "next/image";
import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";



// Define the Plan Type
type Plan = "free" | "premium1" | "premium2" | "premium3";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}
const Page = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("free");
  const [showModal, setShowModal] = useState(false);
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [step, setStep] = useState(1); // Tracks the current step of the form
  const handleNextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 6)); // Go to next step
  const handlePrevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1)); // Go to previous step

  const router = useRouter();

  // React Hook Form setup
  const { handleSubmit, control, setValue, formState: { errors } } = useForm();

  // Handle Modal Open
  const openModal = (plan: Plan) => {
    setSelectedPlan(plan);
    if (plan === "free") {
      // For the free plan, hardcode the role as "Normal User"
      setIsRoleSelected(true);
    } else {
      setShowModal(true);
    }
  };

  const handleRoleSelection = (roles: string[]) => {
    setSelectedRoles([...roles]); // Always include 'user' role
    setIsRoleSelected(true);
    setShowModal(false);
  };

  

  // Handle Back to Plan Selection
  const handleBack = () => {
    setIsRoleSelected(false);
  };

const [selectedRoles, setSelectedRoles] = useState<string[]>([]);


const onSubmit = async (data: FieldValues) => {
  // Type cast the 'data' object to FormData
  const formData = data as FormData;

  if (!isRoleSelected) {
    toast.error("Please select your roles before submitting.");
    return;
  }

  console.log("Selected Plan:", selectedPlan);
  console.log("Selected Roles:", selectedRoles);

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    phone: formData.phone,
    plan: selectedPlan === "free" ? "free" : selectedPlan === "premium1" ? "bronze" : selectedPlan === "premium2" ? "silver" : "gold",
    roles: selectedRoles,
  };

  console.log("Payload being sent:", payload);  // Log the payload to make sure everything looks correct

  try {
    const response = await axios.post("/api/user", payload);
  
    if (response.status === 200 || response.status === 201) {
      console.log("User Plan:", payload.plan);
      console.log("Assigned Roles:", response.data.user?.roles);
  
      toast.success("Registration successful! Redirecting to login...");
  
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error(response.data.message || "An error occurred during sign-up.");
    }
  } catch (error: unknown) {  // Use 'unknown' for the error
    console.error("Error during sign-up:", error);
  
    if (error instanceof AxiosError) {  // Narrow the type to AxiosError
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
  
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed. Please try again.");
      } else if(error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } else {
      // Handle any other error types
      console.error("An unknown error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
  
};

  

  return (
    <div className="relative min-h-screen">
  <div
    className="min-h-screen py-8 overflow-y-auto inset-0 bg-cover bg-center flex justify-center items-center"
    style={{
      backgroundImage: "url('/signup-background.webp')",
      backgroundSize: "cover",  // Ensures the image covers the full screen
      backgroundPosition: "center",  // Ensures the background is centered
    }}
  >
    <div className="bg-gradient-to-b from-pivotaTeal via-black to-pivotaNavy p-8 rounded-lg shadow-lg w-full max-w-6xl z-10 flex-grow">

      <h2 className="text-3xl font-semibold text-center text-white mb-3">Sign Up</h2>

      {!isRoleSelected && (
        <h3 className="text-sm font-semibold text-center text-white mb-3">
          Start with a Free Plan and explore what we have for you!
        </h3>
      )}

      {isRoleSelected && (
        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={handleBack}
            className="text-white hover:bg-pivotaGold text-lg flex items-center"
          >
            <AiOutlineArrowLeft className="mr-2" />
            Back to Plan Selection
          </button>
        </div>
      )}

      {!isRoleSelected ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free Plan */}
          <div
            className="plan-option p-6 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            onClick={() => openModal("free")}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-pivotaGold text-lg font-bold uppercase tracking-wide">
                Free Plan
              </h2>
              <AiOutlineUser className="text-white text-3xl" />
            </div>

            <h3 className="text-2xl text-white font-semibold mb-1">Free Plan</h3>
            <p className="text-sm text-gray-300 mb-3">Perfect for getting started with basic features.</p>

            <div className="border-t border-gray-500 my-4"></div>

            <ul className="text-gray-200 text-sm space-y-2">
              <li>✅ <strong>1 Role Allowed</strong></li>
              <li>✅ <strong>Access to Basic Listings</strong></li>
              <li>✅ <strong>Standard Support</strong></li>
            </ul>

            <div className="border-t border-gray-500 my-4"></div>

            <p className="text-xl font-bold text-pivotaGold">Ksh 0</p>
            <p className="text-sm text-gray-300 mb-4">Valid for 3 Months</p>

            <button className="w-full py-2 bg-pivotaGold text-teal-900 font-semibold rounded-lg transition hover:bg-yellow-400">
              Choose Plan
            </button>
          </div>





          {/* Premium Plan 1 - Bronze */}
          <div
            className="plan-option p-6 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            onClick={() => openModal("premium1")}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-pivotaGold text-lg font-bold uppercase tracking-wide">
                Starter Plan
              </h2>
              <Image src="/bronze.png" width={48} height={48} alt="Bronze Plan" />
            </div>
            
            <h3 className="text-2xl text-white font-semibold mb-1">Bronze Plan</h3>
            <p className="text-sm text-gray-300 mb-3">A great entry-level option for those just starting.</p>
            
            <div className="border-t border-gray-500 my-4"></div>
            
            <ul className="text-gray-200 text-sm space-y-2">
              <li>✅ <strong>1 Role Allowed</strong></li>
              <li>✅ <strong>Access to Basic Listings</strong></li>
              <li>✅ <strong>Standard Support</strong></li>
            </ul>

            <div className="border-t border-gray-500 my-4"></div>

            <p className="text-xl font-bold text-pivotaGold">Ksh 500</p>
            <p className="text-sm text-gray-300 mb-4">Valid for 3 Months</p>

            <button className="w-full py-2 bg-pivotaGold text-teal-900 font-semibold rounded-lg transition hover:bg-yellow-400">
              Choose Plan
            </button>
          </div>

          {/* Premium Plan 2 - Silver */}
          <div
            className="plan-option p-6 bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            onClick={() => openModal("premium2")}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-pivotaGold text-lg font-bold uppercase tracking-wide">
                Most Popular
              </h2>
              <Image src="/silver.png" width={48} height={48} alt="Silver Plan" />
            </div>
            
            <h3 className="text-2xl text-white font-semibold mb-1">Silver Plan</h3>
            <p className="text-sm text-gray-300 mb-3">Unlock premium features with more flexibility.</p>
            
            <div className="border-t border-gray-500 my-4"></div>
            
            <ul className="text-gray-200 text-sm space-y-2">
              <li>✅ <strong>2 Roles Allowed</strong></li>
              <li>✅ <strong>Exclusive Job & Rental Listings</strong></li>
              <li>✅ <strong>Priority Support</strong></li>
            </ul>

            <div className="border-t border-gray-500 my-4"></div>

            <p className="text-xl font-bold text-pivotaGold">Ksh 900</p>
            <p className="text-sm text-gray-300 mb-4">Valid for 3 Months</p>

            <button className="w-full py-2 bg-pivotaGold text-purple-900 font-semibold rounded-lg transition hover:bg-yellow-500">
              Choose Plan
            </button>
          </div>

          {/* Premium Plan 3 - Gold */}
          <div
            className="plan-option p-6 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            onClick={() => openModal("premium3")}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-pivotaNavy text-lg font-bold uppercase tracking-wide">
                Premium Choice
              </h2>
              <Image src="/gold.png" width={48} height={48} alt="Gold Plan" />
            </div>
            
            <h3 className="text-2xl text-white font-semibold mb-1">Gold Plan</h3>
            <p className="text-sm text-gray-300 mb-3">The best value for premium users.</p>
            
            <div className="border-t border-gray-500 my-4"></div>
            
            <ul className="text-gray-200 text-sm space-y-2">
              <li>✅ <strong>3 Roles Allowed</strong></li>
              <li>✅ <strong>Exclusive Access to VIP Listings</strong></li>
              <li>✅ <strong>24/7 Dedicated Support</strong></li>
            </ul>

            <div className="border-t border-gray-500 my-4"></div>

            <p className="text-xl font-bold text-pivotaNavy">Ksh 1500</p>
            <p className="text-sm text-gray-300 mb-4">Valid for 3 Months</p>

            <button className="w-full py-2 bg-pivotaNavy text-yellow-100 font-semibold rounded-lg transition hover:bg-yellow-600">
              Choose Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Display the selected plan */}
          <div className="text-center text-white text-lg mb-4">
            <p><strong>Selected Plan:</strong> {selectedPlan === 'free' ? 'Free' : selectedPlan === 'premium1' ? 'Bronze' : selectedPlan === 'premium2' ? 'Silver' : 'Gold'}</p>
          </div>

          <h3 className="text-xl font-semibold text-center mb-6 text-white">Register with Your Selected Plan</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[90vh] overflow-y-auto">
      {/* Step 1: First Name, Last Name, Phone */}
      {step === 1 && (
        <>
          <div>
            <label className="block text-sm font-semibold text-white">First Name</label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your first name"
                />
              )}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{(errors.firstName as FieldError)?.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your last name"
                />
              )}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{(errors.lastName as FieldError)?.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Phone</label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your phone number"
                />
              )}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{(errors.phone as FieldError)?.message}</p>}
          </div>
        </>
      )}

      {/* Step 2: Email, Password, Confirm Password */}
      {step === 2 && (
        <>
          <div>
            <label className="block text-sm font-semibold text-white">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{(errors.email as FieldError)?.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your password"
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{(errors.password as FieldError)?.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Confirm Password</label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: "Confirm password is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Confirm your password"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{(errors.confirmPassword as FieldError)?.message}</p>
            )}
          </div>
        </>
      )}

      {/* Step 3: Address Fields (for example)
      {step === 3 && (
        <>
          <div>
            <label className="block text-sm font-semibold text-teal-600">Street Address</label>
            <Controller
              name="streetAddress"
              control={control}
              rules={{ required: "Street address is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your street address"
                />
              )}
            />
            {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{(errors.streetAddress as FieldError)?.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-600">City</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your city"
                />
              )}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{(errors.city as FieldError)?.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-600">Postal Code</label>
            <Controller
              name="postalCode"
              control={control}
              rules={{ required: "Postal code is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                  placeholder="Enter your postal code"
                />
              )}
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{(errors.postalCode as FieldError)?.message}</p>}
          </div>
        </>
      )} */}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={step === 1}
          className="px-4 py-2 text-teal-600 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNextStep}
          disabled={step === 3}
          className="px-4 py-2 text-white font-semibold bg-teal-600 rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {step === 3 ? "" : 'Next'}
        </button>
      </div>

      {/* Submit Button (at the last step) */}
      {step === 3 && (
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-500 transition duration-300"
        >
          Sign Up
        </button>
      )}
    </form>

        </div>
      )}
    </div>
  </div>

  {/* Role Selection Modal */}
  {showModal && <RoleSelectionModal selectedPlan={selectedPlan} handleRoleSelection={handleRoleSelection} closeModal={() => setShowModal(false)} />}

  {/* Toast Container for notifications */}
  <ToastContainer />
</div>

  );
};

export default Page;