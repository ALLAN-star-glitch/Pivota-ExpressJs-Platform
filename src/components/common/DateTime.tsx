"use client"; // Mark it as a Client Component

import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null); // Start as null

  useEffect(() => {
    // Set the current time on the client side
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (typeof window === "undefined" || !currentTime) return null; // Avoid rendering on the server

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center gap-3 text-gray-700">
      <FaRegCalendarAlt className="text-2xl" />
      <span className="font-medium">
        {formattedDate} - {formattedTime}
      </span>
    </div>
  );
};

export default DateTime;
