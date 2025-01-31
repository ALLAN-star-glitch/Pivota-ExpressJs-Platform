"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod"; // Import Zod
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from "@/components/common/LoadingBar";

// Define the error type
type FormErrors = {
  [key: string]: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user" as "user" | "superAdmin" | "employer" | "serviceProvider" | "landLord", // Explicitly type the role field
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  // Define the validation schema with Zod
  const userSchema = z.object({
    username: z.string().min(1, { message: "User name is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().regex(/^(?:\+2547|07|01)\d{8}$/, {
      message: "Please enter a valid Kenyan phone number",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message:
          "Password must include 1 uppercase letter, 1 number, and 1 special character",
      }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
    role: z.enum(["superAdmin", "user", "employer", "serviceProvider", "landLord"]).default("user"),
  });

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

    setLoading(true); // Start loading

    try {
      // Parse and validate the data using the schema
      userSchema.parse(formData);

      // Check if password and confirmPassword match
      if (formData.password !== formData.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
        setLoading(false); // Stop loading
        return;
      }

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

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirmPassword: values.confirmPassword,
          role: values.role, // Send the selected role
        }),
      });
  
      if (response.ok) {
        toast.success("Registration successful! Please log in.", { position: "top-right" });
          router.push("/login"); // Redirect to login page
      } else {
        const errorData = await response.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: errorData.message || "Registration failed, please try again later.",
        }));
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
      {loading && <LoadingBar />}

      {/* LEFT - Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-screen bg-cover bg-center relative">
        <Image
          src="/signup-image.webp"
          alt="Sign Up"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 hidden md:block"
        />
      </div>

      {/* RIGHT - Form */}
      <div className="w-full md:w-1/2 h-screen overflow-y-auto flex justify-center items-center p-8 pt-24 pb-24">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Create an Account</h2>

          {/* User Name */}
          <div className="mb-4 flex items-center">
            <label htmlFor="username" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="e.g. johndoe123"
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username}</p>}
          </div>

          {/* Horizontal Form Fields */}
          {[{ label: "First Name", id: "firstName", type: "text", value: formData.firstName, placeholder: "e.g John" },
            { label: "Last Name", id: "lastName", type: "text", value: formData.lastName, placeholder: "e.g Doe" },
            { label: "Email", id: "email", type: "email", value: formData.email, placeholder: "e.g johndoe@gmail.com" }].map(({ label, id, type, value, placeholder }) => (
            <div className="mb-4 flex items-center" key={id}>
              <label htmlFor={id} className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={value}
                onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                required
              />
              {errors[id] && <p className="text-red-500 text-xs mt-2">{errors[id]}</p>}
            </div>
          ))}

          {/* Phone */}
          <div className="mb-4 flex items-center">
            <label htmlFor="phone" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g +254712345678"
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div className="mb-4 flex items-center">
            <label htmlFor="password" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <span
              className="cursor-pointer ml-2 text-teal-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4 flex items-center">
            <label htmlFor="confirmPassword" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <span
              className="cursor-pointer ml-2 text-teal-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword}</p>}
          </div>

          {/* Role */}
          <div className="mb-4 flex items-center">
            <label htmlFor="role" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as "user" | "superAdmin" | "employer" | "serviceProvider" | "landLord" })}
              required
            >
              <option value="user">Normal User</option>
              <option value="serviceProvider">Service Provider</option>
              <option value="employer">Employer</option>
              <option value="landLord">Landlord</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-2">{errors.role}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700"
          >
            Create Account
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
