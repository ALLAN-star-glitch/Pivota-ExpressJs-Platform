"use client";

import { useState } from "react";
import { FaBriefcase, FaHome, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

type JobListing = {
  title: string;
  location: string;
  salary: string;
  type: string;
};

type ServiceProviderListing = {
  name: string;
  title: string;
  location: string;
  rate: string;
  availability: string;
};

type HousingListing = {
  title: string;
  location: string;
  price: string;
  type: string;
};

const availableListings: {
  Jobs: JobListing[];
  "Service Providers": ServiceProviderListing[];
  Housing: HousingListing[];
} = {
  Jobs: [
    { title: "Software Engineer", location: "Nairobi", salary: "KSH 120,000", type: "Full-Time" },
    { title: "Graphic Designer", location: "Mombasa", salary: "KSH 80,000", type: "Part-Time" },
    { title: "Data Entry Clerk", location: "Nakuru", salary: "KSH 40,000", type: "Remote" },
  ],
  "Service Providers": [
    { name: "John Mwangi", title: "Plumber", location: "Nairobi", rate: "KSH 1,500/hr", availability: "24/7" },
    { name: "Susan Achieng", title: "Electrician", location: "Kisumu", rate: "KSH 2,000/hr", availability: "9 AM - 5 PM" },
    { name: "David Kimani", title: "Private Tutor", location: "Eldoret", rate: "KSH 1,200/hr", availability: "Evenings" },
  ],
  Housing: [
    { title: "2 Bedroom Apartment", location: "Nairobi", price: "KSH 35,000/month", type: "Rental" },
    { title: "4 Bedroom House", location: "Mombasa", price: "KSH 8M", type: "For Sale" },
    { title: "Studio Apartment", location: "Kisumu", price: "KSH 18,000/month", type: "Rental" },
  ],
};

export default function AvailableListings() {
  const categories = Object.keys(availableListings) as Array<keyof typeof availableListings>;
  const [activeCategory, setActiveCategory] = useState<keyof typeof availableListings>(categories[0]);

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-pivotaLightGray min-h-screen">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-pivotaNavy text-center mb-8 sm:mb-12">Available Listings</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 sm:px-6 py-2 rounded-full text-lg sm:text-xl font-medium transition-all 
              ${activeCategory === category ? "bg-pivotaTeal text-white shadow-md" : "bg-white text-pivotaNavy border border-pivotaTeal"}`}
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

      {/* Listings */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
      >
        {availableListings[activeCategory].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-md text-pivotaNavy p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            {activeCategory === "Jobs" && (
              <>
                <h4 className="font-semibold text-lg sm:text-xl mb-2">{(item as JobListing).title}</h4>
                <p className="text-sm text-gray-600">{(item as JobListing).location}</p>
                <p className="text-sm"><strong>Salary:</strong> {(item as JobListing).salary}</p>
                <p className="text-sm"><strong>Type:</strong> {(item as JobListing).type}</p>
              </>
            )}

            {activeCategory === "Service Providers" && (
              <>
                <h4 className="font-semibold text-lg sm:text-xl mb-2">{(item as ServiceProviderListing).name}</h4>
                <p className="text-sm text-gray-600"><strong>Profession:</strong> {(item as ServiceProviderListing).title}</p>
                <p className="text-sm"><strong>Location:</strong> {(item as ServiceProviderListing).location}</p>
                <p className="text-sm"><strong>Rate:</strong> {(item as ServiceProviderListing).rate}</p>
                <p className="text-sm"><strong>Availability:</strong> {(item as ServiceProviderListing).availability}</p>
              </>
            )}

            {activeCategory === "Housing" && (
              <>
                <h4 className="font-semibold text-lg sm:text-xl mb-2">{(item as HousingListing).title}</h4>
                <p className="text-sm text-gray-600">{(item as HousingListing).location}</p>
                <p className="text-sm"><strong>Price:</strong> {(item as HousingListing).price}</p>
                <p className="text-sm"><strong>Type:</strong> {(item as HousingListing).type}</p>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* View More Button */}
      <div className="flex justify-center mt-8 sm:mt-12">
        <button className="px-6 py-3 bg-pivotaTeal text-white font-semibold rounded-lg shadow-md hover:bg-pivotaNavy transition-all">
          View More
        </button>
      </div>
    </div>
  );
}
