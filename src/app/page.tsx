"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { z } from 'zod'; // Import Zod

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  // Function to generate a random password
  const generateRandomPassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  // Define the validation schema with Zod
  const userSchema = z.object({
    username: z.string().min(1, { message: 'User name is required' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().regex(/^(?:\+2547|07)\d{8}$/, {
      message: 'Please enter a valid Kenyan phone number', 
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message:
          'Password must include 1 uppercase letter, 1 number, and 1 special character',
      }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
  });


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    // Reset errors before validation
    setErrors({});

    setLoading(true); // Start loading
  
    try {
      // Parse and validate the data using the schema
      userSchema.parse(formData);
  
      // Check if password and confirmPassword match
      if (formData.password !== formData.confirmPassword) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          confirmPassword: 'Passwords do not match',
        }));
        setLoading(false); // Stop loading 
        return;
      }
  
      // Call onSubmit if validation passes
      await onSubmit(formData);
  
    } catch (error) {
      // Handle validation errors from Zod
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as { [key: string]: string });
  
        setErrors(newErrors); // Update state with validation errors
      }
    }

    setLoading(false); // Stop loading after validation
  };
  
  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",  // Make sure to use "POST" instead of "Post"
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
      });
  
      if (response.ok) {
        // If no errors, proceed with form submission
        router.push('/dashboard/super-admin');
      } else {
        const errorData = await response.json();
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          apiError: errorData.message || 'Registration failed, please try again later.',
        }));
      }
    } catch (error) {
      console.error('API error:', error);
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        apiError: 'An error occurred while processing your request.',
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
              {errors[id] && <p className="text-red-500 text-xs mt-2">{errors[id]}</p>}
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
          {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone}</p>}

          {/* Generate Password Feature */}
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="password" className="w-1/3 text-sm text-gray-700 font-medium cursor-pointer">
            
            </label>
            <button
              type="button"
              className="text-sm text-teal-600 hover:text-teal-700"
              onClick={() => setFormData({ ...formData, password: generateRandomPassword() })}
            >
              Generate Password
            </button>
          </div>

          {/* Password and Confirm Password fields */}
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
              {errors[id] && <p className="text-red-500 text-xs mt-2">{errors[id]}</p>}
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
