import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface UnauthenticatedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UnauthenticatedPostAdModal: React.FC<UnauthenticatedModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handlePricingRedirect = () => {
    onClose();  // Close the modal
    router.push("/pricing"); // Redirect to pricing page
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-yellow-500 text-black p-4 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-2xl text-black hover:text-white"
          onClick={onClose}
        >
          &times;
        </button>
        
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
    </div>
  );
};

export default UnauthenticatedPostAdModal;
