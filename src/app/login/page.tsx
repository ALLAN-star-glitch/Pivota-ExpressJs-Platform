"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import LoadingBar from "@/components/common/LoadingBar";


// Define the validation schema with Zod
const userSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message:
        "Password must include 1 uppercase letter, 1 number, and 1 special character",
    }),
});

// Infer the type for the form data
type FormData = z.infer<typeof userSchema>;

type FormErrors = {
  [key: string]: string;
};

const SignIn = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  
  // Effect to show API error toast
  useEffect(() => {
    if (errors.apiError) {
      toast.error(errors.apiError, { position: "top-right" });
    }
  }, [errors.apiError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({});
    setLoading(true);

    try {
      // Parse and validate the data using the schema
      userSchema.parse(formData);

      // Call onSubmit if validation passes
      await onSubmit(formData);
    } catch (error) {
      // Handle validation errors from Zod
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as FormErrors);

        setErrors(newErrors); // Update state with validation errors
      }
    }

    setLoading(false); // Stop loading after validation
  };


  const onSubmit = async (values: FormData) => {
    try {
      // Log out the current session to ensure cookies are cleared
      await signOut({ redirect: false });
  
      // Sign in with credentials
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
  
      if (result?.error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: result.error || "Login failed, please try again.",
        }));
        return;
      }
  
      // Wait for session update before accessing roles
      const checkSession = async () => {
        let retries = 5;
        while (retries > 0) {
          const updatedSession = await fetch("/api/auth/session").then((res) => res.json());
          if (updatedSession?.user?.roles) return updatedSession;
          await new Promise((resolve) => setTimeout(resolve, 500)); // Wait before retrying
          retries--;
        }
        return null;
      };
  
      const updatedSession = await checkSession();
      if (!updatedSession || !updatedSession.user?.roles?.length) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: "Unable to determine user role. Please try again.",
        }));
        return;
      }
  
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Error details:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        apiError: "An error occurred while processing your request.",
      }));
    }
  };
  
  
  
  
  
  

  

  // Handle "Go to Homepage" button click
  const handleGoToHomepage = () => {
    setLoading(true); // Show loading bar
    router.push("/"); // Navigate to homepage
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-pivotaNavy to-pivotaTeal">
      {/* Loading Bar */}
      {loading && <LoadingBar />}

      {/* LEFT - Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-screen bg-cover bg-center relative">
        <Image
          src="/login-image.webp"
          alt="Sign In"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 hidden md:block"
        />
      </div>

      {/* RIGHT - Form */}
      <div className="w-full md:w-1/2 h-screen flex justify-center items-center p-8 pt-24 pb-24">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-h-[90vh] max-w-xl overflow-y-auto">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Sign In</h2>

          {/* Email */}
          <div className="mb-4 flex items-center">
            <label htmlFor="email" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              Email
            </label>
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
            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4 flex items-center">
            <label htmlFor="password" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              Password
            </label>
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
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign in with Google */}
          <div
            className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4 cursor-pointer"
            onClick={() => signIn("google")}
          >
            Sign in with Google
            <Image className="" src="/googleicon.png" width={20} height={20} alt="google icon" />
          </div>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-teal-500 font-semibold">
              Forgot Password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don&apos;t have an account? Visit Our{" "}
              <Link href="/pricing" className="text-teal-500 font-semibold">
                Pricing Page to sign up
              </Link>
            </p>
          </div>

          {/* Go to Homepage Button */}
          <div className="mt-4 text-center">
            <button
              className="text-teal-500 font-semibold"
              onClick={handleGoToHomepage}
              disabled={loading}
            >
              Go to Homepage
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
