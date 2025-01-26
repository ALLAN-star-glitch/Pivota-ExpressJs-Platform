"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Reset errors
    setPhoneError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let isValid = true;

    // Validate Kenyan phone number
    const phonePattern = /^(?:\+254|07)\d{8}$/;
    if (!phonePattern.test(formData.phone)) {
      setPhoneError('Please enter a valid Kenyan phone number');
      isValid = false;
    }

    // Validate email pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Password strength validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include 1 number, 1 uppercase letter, and 1 special character'
      );
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    // If all validations pass, proceed with form submission
    if (isValid) {
      router.push('/dashboard/super-admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-pivotaNavy to-pivotaTeal">
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
            <label htmlFor="userName" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="e.g. johndoe123"
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              required
            />
          </div>

          {/* Horizontal Form Fields */}
          {[
            { label: 'First Name', id: 'firstName', type: 'text', value: formData.firstName, placeholder: 'e.g John' },
            { label: 'Last Name', id: 'lastName', type: 'text', value: formData.lastName, placeholder: 'e.g Doe' },
            { label: 'Email', id: 'email', type: 'email', value: formData.email, placeholder: 'e.g johndoe@gmail.com' },
          ].map(({ label, id, type, value, placeholder }) => (
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
              {id === 'email' && emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
            </div>
          ))}

          {/* Phone */}
          <div className="mb-4 flex items-center">
            <label htmlFor="phone" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
              Phone
            </label>
            <div className="relative w-2/3">
              <Image
                src="/flag.png"
                alt="Kenya Flag"
                width={24}
                height={24}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="e.g. +254712345678 or 0712345678"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>
          {phoneError && <p className="text-red-500 text-xs mt-2">{phoneError}</p>}

          {/* Password */}
          {[
            { label: 'Password', id: 'password', show: showPassword, setShow: setShowPassword, value: formData.password },
            {
              label: 'Confirm Password',
              id: 'confirmPassword',
              show: showConfirmPassword,
              setShow: setShowConfirmPassword,
              value: formData.confirmPassword,
            },
          ].map(({ label, id, show, setShow, value }) => (
            <div className="mb-4 flex items-center relative" key={id}>
              <label htmlFor={id} className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
                {label}
              </label>
              <div className="w-2/3 relative">
                <input
                  type={show ? 'text' : 'password'}
                  id={id}
                  name={id}
                  placeholder={label}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShow(!show)}
                >
                  {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {id === 'password' && passwordError && <p className="text-red-500 text-xs mt-2">{passwordError}</p>}
              {id === 'confirmPassword' && confirmPasswordError && <p className="text-red-500 text-xs mt-2">{confirmPasswordError}</p>}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
          >
            Sign Up
          </button>

          {/* Google Sign Up */}
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg shadow-md mb-2 mt-2 hover:bg-gray-100 transition-colors"
          >
            Sign Up with Google
            <Image src="/google.png" alt="Google Icon" width={70} height={40} className="ml-2" />
          </button>

          {/* Already have an account link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
