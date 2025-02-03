import { useState } from "react";
import { AiOutlineUser, AiOutlineTeam, AiOutlineApartment, AiOutlineClose } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify"; // Importing toast

type Plan = "free" | "premium1" | "premium2" | "premium3";

const RoleSelectionModal = ({
  selectedPlan,
  handleRoleSelection,
  closeModal,
}: {
  selectedPlan: Plan;
  handleRoleSelection: (roles: string[]) => void;
  closeModal: () => void;
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  // Define available roles based on plan
  const roles: Record<Plan, string[]> = {
    free: [],
    premium1: ["employer", "serviceProvider", "landlord"],
    premium2: ["employer", "serviceProvider", "landlord"],
    premium3: ["employer", "serviceProvider", "landlord"],
  };

  // Max roles based on selected plan
  const maxRoles: Record<Plan, number> = {
    free: 0,
    premium1: 1,
    premium2: 2,
    premium3: 3,
  };

  const handleRoleChange = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = () => {
    if (selectedRoles.length === 0) {
      toast.error("Please select at least one role.");
      return;
    }

    if (selectedRoles.length > maxRoles[selectedPlan]) {
      toast.error(`You can only select up to ${maxRoles[selectedPlan]} roles for this plan.`);
      return;
    }

    handleRoleSelection(selectedRoles);
    toast.success("Roles selected successfully!");
  };

  // Define color schemes for each plan
  const planColors: Record<Plan, string> = {
    free: "bg-gray-300", // Free Plan (No specific color)
    premium1: "bg-gradient-to-r from-teal-600 to-teal-500", // Bronze Plan
    premium2: "bg-gradient-to-r from-purple-700 to-purple-500", // Silver Plan
    premium3: "bg-gradient-to-r from-yellow-600 to-yellow-500", // Gold Plan
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onClick={closeModal}
      style={{ zIndex: 999 }}
    >
      <div
        className={`bg-white rounded-lg w-full max-w-lg p-8 relative ${planColors[selectedPlan]}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          zIndex: 1000, // Ensure modal appears above the overlay
          borderRadius: "12px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl text-white hover:text-pivotaCoral"
        >
          <AiOutlineClose />
        </button>

        <h3 className="text-xl font-semibold text-center mb-6 text-white">Choose Your Account Role</h3>

        <p className="text-center text-sm text-gray-200 mb-4">
          Sign Up As: {maxRoles[selectedPlan]} role(s) for your plan.
        </p>

        {/* Role Selection for Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles[selectedPlan].map((role) => (
            <button
              key={role}
              className={`p-4 text-gray-200 rounded-lg shadow-md transition-all duration-300 ${
                selectedRoles.includes(role)
                  ? "bg-white text-pivotaTeal shadow-xl"
                  : "bg-gray-800 hover:bg-gray-700"
              } hover:shadow-2xl cursor-pointer`}
              onClick={() => handleRoleChange(role)}
            >
              <div className="flex items-center space-x-2">
                {role === "employer" && <AiOutlineTeam className="text-xl" />}
                {role === "serviceProvider" && <AiOutlineUser className="text-xl" />}
                {role === "landlord" && <AiOutlineApartment className="text-xl" />}
                <span>{role}</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-200 mb-2 mt-2">
          You can select up to {maxRoles[selectedPlan]} role(s) for your plan.
        </p>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="w-full bg-pivotaTeal text-white p-3 rounded hover:bg-teal-700 transition"
          >
            Confirm Selection
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoleSelectionModal;
