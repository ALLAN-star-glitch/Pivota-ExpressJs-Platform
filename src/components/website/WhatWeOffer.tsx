import { useState } from "react";
import { FaBriefcase, FaHome, FaTools, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import AvailableListings from "./AvailableListings";

// Define the type structure with optional properties
type SearchItem = {
  title: string;
  category: string;
  location: string;
  salary?: string;  // Only for jobs
  rate?: string;    // Only for services
  price?: string;   // Only for housing
  type?: string;    // Job type or housing type
  availability?: string; // Only for services
};

const searchData: SearchItem[] = [
// Jobs
{ title: "Software Engineer", category: "Jobs", location: "Nairobi", salary: "KSH 120,000", type: "Full-Time" },
{ title: "Graphic Designer", category: "Jobs", location: "Mombasa", salary: "KSH 80,000", type: "Part-Time" },
{ title: "Data Entry Clerk", category: "Jobs", location: "Nakuru", salary: "KSH 40,000", type: "Remote" },
{ title: "Project Manager", category: "Jobs", location: "Kisumu", salary: "KSH 150,000", type: "Full-Time" },
{ title: "UI/UX Designer", category: "Jobs", location: "Eldoret", salary: "KSH 95,000", type: "Freelance" },
{ title: "Marketing Specialist", category: "Jobs", location: "Nairobi", salary: "KSH 75,000", type: "Remote" },

// Services
{ title: "Plumbing Services", category: "Services", location: "Nairobi", rate: "KSH 1,500/hr", availability: "24/7" },
{ title: "Electrician", category: "Services", location: "Kisumu", rate: "KSH 2,000/hr", availability: "9 AM - 5 PM" },
{ title: "Private Tutor", category: "Services", location: "Eldoret", rate: "KSH 1,200/hr", availability: "Evenings" },
{ title: "Carpentry Services", category: "Services", location: "Mombasa", rate: "KSH 1,800/hr", availability: "Weekdays" },
{ title: "Gardening Services", category: "Services", location: "Nakuru", rate: "KSH 1,000/hr", availability: "Weekends" },
{ title: "House Cleaning", category: "Services", location: "Kisumu", rate: "KSH 1,200/hr", availability: "Weekdays" },

// Housing
{ title: "2 Bedroom Apartment", category: "Housing", location: "Nairobi", price: "KSH 35,000/month", type: "Rental" },
{ title: "4 Bedroom House", category: "Housing", location: "Mombasa", price: "KSH 8M", type: "For Sale" },
{ title: "Studio Apartment", category: "Housing", location: "Kisumu", price: "KSH 18,000/month", type: "Rental" },
{ title: "1 Bedroom Apartment", category: "Housing", location: "Nakuru", price: "KSH 20,000/month", type: "Rental" },
{ title: "5 Bedroom Villa", category: "Housing", location: "Mombasa", price: "KSH 15M", type: "For Sale" },
{ title: "3 Bedroom Bungalow", category: "Housing", location: "Eldoret", price: "KSH 5M", type: "For Sale" },
{ title: "Luxury Penthouse", category: "Housing", location: "Nairobi", price: "KSH 120,000/month", type: "Rental" },
];

const categories = ["Jobs", "Services", "Housing"];
const locations = ["Nairobi", "Mombasa", "Nakuru", "Kisumu", "Eldoret"];

export default function HomePageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Jobs");
  const [selectedLocation, setSelectedLocation] = useState("Nairobi");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dynamically update placeholder based on category
  const placeholderText = {
    Jobs: "Search for jobs...",
    Services: "Search for service providers...",
    Housing: "Search for houses...",
  }[selectedCategory];

  // Filtered search results based only on category, location, and search query
  const filteredResults = searchData.filter(
    (item) =>
      item.category === selectedCategory &&
      item.location === selectedLocation &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Limit the number of results displayed
  const displayedResults = filteredResults.slice(0, 5);
  const hasMoreResults = filteredResults.length > 5;

  return (
    <div className="py-16 px-8 text-center">
      {/* Search Section */}
      <div className="py-16 px-8 text-center relative">
        <div className="flex flex-col items-center space-y-4">
          {/* Category & Location Dropdowns */}
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white text-pivotaNavy px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pivotaTeal"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white text-pivotaNavy px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pivotaTeal"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder={placeholderText}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)} // Show dropdown on focus
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)} // Hide dropdown after a short delay
              className="bg-white text-pivotaNavy px-6 py-3 rounded-full shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-pivotaTeal transition-all duration-300"
            />
            <FaSearch className="absolute right-4 top-3 text-pivotaTeal text-lg" />
          </div>

          {/* Dropdown with Results */}
          {isDropdownOpen && (
            <div
            className="absolute top-full left-0 w-full bg-pivotaTeal bg-opacity-90 text-white rounded-lg p-4 max-h-60 overflow-y-auto"
            style={{ zIndex: 10 }}
            >
              {displayedResults.length > 0 ? (
                displayedResults.map((item, index) => (
                  <div key={index} className="py-2 border-b border-gray-400">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm">{item.location}</p>
                    {item.salary && <p className="text-sm">{item.salary}</p>}
                    {item.rate && <p className="text-sm">{item.rate}</p>}
                    {item.price && <p className="text-sm">{item.price}</p>}
                    <div className="flex justify-between items-center">
                      <button className="text-pivotaTeal text-sm hover:underline">View More</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}

              {hasMoreResults && (
                <div className="text-center text-pivotaTeal mt-2">
                  <button className="hover:underline">View More Results</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div> 
      {/* What We Offer Section */}
      <div className="py-16 bg-pivotaLightGray">
        <h2 className="text-4xl font-semibold text-pivotaNavy mb-6">What We Offer</h2>
        <p className="text-lg text-pivotaNavy mb-12">
          We connect you to the best opportunities in the job market, reliable services, and quality housing. 
          Explore our diverse categories to find exactly what you need.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Job Opportunities Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaBriefcase className="text-pivotaTeal text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-pivotaNavy">Job Opportunities</h3>
            <p className="text-sm text-pivotaNavy">
              Discover full-time, part-time, freelance, and remote job openings across various industries.
            </p>
            <button className="mt-4 text-pivotaTeal hover:underline">Explore Jobs</button>
          </div>

          {/* Services Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaTools className="text-pivotaTeal text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-pivotaNavy">Professional Services</h3>
            <p className="text-sm text-pivotaNavy">
              Access a wide range of services from skilled professionals in fields like plumbing, electrical work, tutoring, and more.
            </p>
            <button className="mt-4 text-pivotaTeal hover:underline">Find Services</button>
          </div>

          {/* Housing Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaHome className="text-pivotaTeal text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-pivotaNavy">Housing & Rentals</h3>
            <p className="text-sm text-pivotaNavy">
              Find the perfect rental home or browse properties for sale in various locations. Affordable and luxurious options await.
            </p>
            <button className="mt-4 text-pivotaTeal hover:underline">Browse Housing</button>
          </div>
          </div>
          </div>

           {/* Available Listings Section */}
      <AvailableListings />
      
    </div>

  );
}
