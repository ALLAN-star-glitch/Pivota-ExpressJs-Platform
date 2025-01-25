'use client'; // Ensures this component is treated as a client-side component

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    router.push('/dashboard/super-admin'); // Redirect to the dashboard page
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-pivotaNavy to-pivotaTeal">
      {/* LEFT - Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-screen bg-cover bg-center relative">
        <Image
          src="/signup-image.webp" // Replace with your image path
          alt="Sign Up"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 hidden md:block"
        />
      </div>

      {/* RIGHT - Form */}
      <div className="w-full md:w-1/2 h-screen overflow-y-auto flex justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Create an Account</h2>

          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-sm text-gray-700 font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
          >
            Sign Up
          </button>

          {/* Already have an account link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-500 hover:underline">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
