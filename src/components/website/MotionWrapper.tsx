"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaLightbulb } from "react-icons/fa";
import { IconType } from "react-icons"; // ✅ Correct import for IconType

// Define TypeScript interface for props
interface MotionWrapperProps {
  icon: IconType; // Now correctly typed
  title: string;
  text: string;
  color: string;
}

export default function MotionWrapper({ icon: IconComponent, title, text, color }: MotionWrapperProps) {
  return (
    <motion.div
      className="flex items-center text-center space-x-4 p-6 bg-white bg-opacity-10 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <IconComponent className={`text-5xl ${color}`} /> {/* ✅ Uses icon as a component */}
      <div>
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-sm">{text}</p>
      </div>
    </motion.div>
  );
}
