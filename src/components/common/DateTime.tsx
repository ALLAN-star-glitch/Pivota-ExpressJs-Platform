// "use client"; // Mark this as a Client Component

// import { useState, useEffect } from "react";
// import { FaRegCalendarAlt } from "react-icons/fa";

// const DateTime = () => {
//   const [currentTime, setCurrentTime] = useState<Date | null>(null); // Start as null

//   // This hook will only run on the client side, after the component mounts
//   useEffect(() => {
//     setCurrentTime(new Date()); // Set the initial time
//     const timer = setInterval(() => {
//       setCurrentTime(new Date()); // Update the time every second
//     }, 1000);
    
//     return () => clearInterval(timer); // Cleanup on unmount
//   }, []);

//   // Return nothing if no time has been set yet (i.e., during SSR or before mount)
//   if (!currentTime) return null;

//   // Format time and date only after the component has mounted
//   const formattedTime = currentTime.toLocaleTimeString();
//   const formattedDate = currentTime.toLocaleDateString(undefined, {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="flex items-center gap-3 text-gray-700">
//       <FaRegCalendarAlt className="text-2xl" />
//       <span className="font-medium">
//         {formattedDate} - {formattedTime}
//       </span>
//     </div>
//   );
// };

// export default DateTime;
