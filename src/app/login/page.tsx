'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import LoadingBar from "@/components/common/LoadingBar";



import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "@/lib/features/api/apiSlice";
import { setUser } from "@/lib/features/auth/authslice";


// Define the validation schema with Zod
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message: "Password must include 1 uppercase letter, 1 number, and 1 special character",
    }),
});

// Infer the type for the form data
type FormData = z.infer<typeof userSchema>;

const Page = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch();
  
  // ✅ RTK Query mutation for login
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authState")) {
      router.push("/dashboard"); // Redirect if user is already authenticated
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const result = userSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors.map((err) => err.message).join("\n"));
      return;
    }

    setIsLoading(true);
  
    try {
      const response = await loginUser(formData).unwrap(); // ✅ Use RTK Query mutation

      console.log("User from Backend", response)
      
      if (response) {
        dispatch(setUser(response)); // ✅ Save user data in Redux store
        toast.success("Login successful!");
        router.push("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      toast.error( "Login failed. Please try again.");
    }

    setIsLoading(false);
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-pivotaNavy to-pivotaTeal">
      {isLoading && <LoadingBar isLoading={false} />}

      {/* LEFT - Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-screen bg-cover bg-center relative">
        <Image src="/login-image.webp" alt="Sign In" layout="fill" objectFit="cover" className="absolute inset-0 hidden md:block" />
      </div>

      {/* RIGHT - Form */}
      <div className="w-full md:w-1/2 h-screen flex justify-center items-center p-8 pt-24 pb-24">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-h-[90vh] max-w-xl overflow-y-auto">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Sign In</h2>

          {/* Email */}
          <div className="mb-4 flex items-center">
            <label htmlFor="email" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. johndoe@example.com"
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 flex items-center">
            <label htmlFor="password" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">Password</label>
            <div className="relative w-2/3">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-teal-500 font-semibold">Forgot Password?</Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don&apos;t have an account? Visit Our <Link href="/pricing" className="text-teal-500 font-semibold">Pricing Page to sign up</Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Page;
