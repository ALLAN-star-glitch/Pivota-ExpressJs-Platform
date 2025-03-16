"use client";

import { useState } from "react";
import { FaBriefcase, FaHome, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

type JobListing = {
  title: string;
  location: string;
  salary: string;
  type: string;
  image: string;
};

type ServiceProviderListing = {
  name: string;
  title: string;
  location: string;
  rate: string;
  availability: string;
  image: string;
};

type HousingListing = {
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
};

const availableListings: {
  Jobs: JobListing[];
  "Service Providers": ServiceProviderListing[];
  Housing: HousingListing[];
} = {
  Jobs: [
    { title: "Software Engineer", location: "Nairobi", salary: "KSH 120,000", type: "Full-Time", image: "/signup-image.webp" },
    { title: "Graphic Designer", location: "Mombasa", salary: "KSH 80,000", type: "Part-Time", image: "/images/graphic-designer.jpg" },
    { title: "Data Entry Clerk", location: "Nakuru", salary: "KSH 40,000", type: "Remote", image: "/images/data-entry.jpg" },
  ],
  "Service Providers": [
    { name: "John Mwangi", title: "Plumber", location: "Nairobi", rate: "KSH 1,500/hr", availability: "24/7", image: "/images/plumber.jpg" },
    { name: "Susan Achieng", title: "Electrician", location: "Kisumu", rate: "KSH 2,000/hr", availability: "9 AM - 5 PM", image: "/images/electrician.jpg" },
    { name: "David Kimani", title: "Private Tutor", location: "Eldoret", rate: "KSH 1,200/hr", availability: "Evenings", image: "/images/tutor.jpg" },
  ],
  Housing: [
    { title: "2 Bedroom Apartment", location: "Nairobi", price: "KSH 35,000/month", type: "Rental", image: "/images/apartment.jpg" },
    { title: "4 Bedroom House", location: "Mombasa", price: "KSH 8M", type: "For Sale", image: "/images/house.jpg" },
    { title: "Studio Apartment", location: "Kisumu", price: "KSH 18,000/month", type: "Rental", image: "/images/studio.jpg" },
  ],
};

export default function AvailableListings() {
  const categories = Object.keys(availableListings) as Array<keyof typeof availableListings>;
  const [activeCategory, setActiveCategory] = useState<keyof typeof availableListings>(categories[0]);

  return (
    <section className="relative w-full h-auto py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[-1]"></div>

      {/* 🔹 Content */}
      <h2 className="text-3xl sm:text-4xl font-bold text-black text-center mb-8 sm:mb-12">
        Available Listings
      </h2>

      {/* 🔹 Categories */}
      <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 sm:px-6 py-2 rounded-full text-lg sm:text-xl font-medium transition-all ${
              activeCategory === category ? "bg-pivotaGold text-pivotaNavy shadow-md" : "bg-white text-pivotaNavy border border-pivotaGold"
            }`}
            onClick={() => setActiveCategory(category)}
            whileTap={{ scale: 0.9 }}
          >
            {category === "Jobs" && <FaBriefcase className="inline-block mr-2" />}
            {category === "Service Providers" && <FaTools className="inline-block mr-2" />}
            {category === "Housing" && <FaHome className="inline-block mr-2" />}
            {category}
          </motion.button>
        ))}
      </div>

      {/* 🔹 Listings */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {availableListings[activeCategory].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-lg text-pivotaNavy p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={200}
              height={200}
              className="w-20 h-20 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-lg sm:text-xl mb-2">{(item as any).title || (item as any).name}</h4>
            <p className="text-sm text-gray-600">{(item as any).location}</p>
            {activeCategory === "Jobs" && <p className="text-sm"><strong>Salary:</strong> {(item as JobListing).salary}</p>}
            {activeCategory === "Jobs" && <p className="text-sm"><strong>Type:</strong> {(item as JobListing).type}</p>}
            {activeCategory === "Service Providers" && <p className="text-sm"><strong>Rate:</strong> {(item as ServiceProviderListing).rate}</p>}
            {activeCategory === "Service Providers" && <p className="text-sm"><strong>Availability:</strong> {(item as ServiceProviderListing).availability}</p>}
            {activeCategory === "Housing" && <p className="text-sm"><strong>Price:</strong> {(item as HousingListing).price}</p>}
            {activeCategory === "Housing" && <p className="text-sm"><strong>Type:</strong> {(item as HousingListing).type}</p>}
          </motion.div>
        ))}
      </motion.div>

      {/* 🔹 View More Button */}
      <div className="flex justify-center mt-8 sm:mt-12">
        <button className="px-6 py-3 bg-pivotaGold text-pivotaNavy font-semibold rounded-lg shadow-md hover:bg-pivotaNavy hover:text-white transition-all">
          View More
        </button>
      </div>
    </section>
  );
}
