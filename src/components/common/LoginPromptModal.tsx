"use client";
import React from "react";
import { useRouter } from "next/navigation";  // To redirect users to login/signup pages

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = () => {
    router.push("/login"); // Redirect to login page
  };

  const handleSignUp = () => {
    router.push("/signup"); // Redirect to signup page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-pivotaNavy mb-4">Please Log In</h2>
        <p className="text-center text-pivotaNavy mb-6">You need to log in or create an account to post an ad.</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-pivotaTeal text-white px-6 py-2 rounded-md hover:bg-pivotaAqua"
            onClick={handleLogin}
          >
            Log In
          </button>
          <button
            className="bg-pivotaGold text-pivotaNavy px-6 py-2 rounded-md hover:bg-pivotaAqua"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            className="text-pivotaCoral hover:text-pivotaTeal"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
