import React from "react";
import { createPortal } from "react-dom";

interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-pivotaTeal bg-opacity-20 z-[9999]">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-xl z-[10000]">
        <h2 className="text-lg font-semibold">Confirm Logout</h2>
        <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
        </div>
      </div>
    </div>,
    document.body // Moves modal to the body to avoid z-index issues
  );
};

export default LogoutModal;
