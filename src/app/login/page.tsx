"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

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
      // Send credentials to the NextAuth API endpoint
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
      } else {
        // Redirect to dashboard if login is successful
        router.push("/dashboard/super-admin?success=true");
      }
    } catch (error) {
      console.error("API error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        apiError: "An error occurred while processing your request.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-pivotaNavy to-pivotaTeal">
      {/* Loading Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-pivotaTeal via-pivotaAqua to-pivotaCoral animate-pulse z-50"></div>
      )}

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
      <div className="w-full md:w-1/2 h-screen overflow-y-auto flex justify-center items-center p-8 pt-24 pb-24">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
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
              Don't have an account?{" "}
              <Link href="/signup" className="text-teal-500 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
