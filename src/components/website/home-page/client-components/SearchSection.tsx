"use client"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Categories and locations
const categories = ["Jobs", "Service Providers", "Housing"];
const locations = ["Nairobi", "Mombasa", "Nakuru", "Kisumu", "Eldoret"];

type SearchItem = {
  title: string;
  category: string;
  location: string;
  salary?: string;
  rate?: string;
  price?: string;
  type?: string;
  availability?: string;
  image?: string;
};

const searchData: SearchItem[] = [
  // Jobs
  { title: "Software Engineer", category: "Jobs", location: "Nairobi", salary: "KSH 120,000", type: "Full-Time", image: "https://via.placeholder.com/50" },
  { title: "Graphic Designer", category: "Jobs", location: "Mombasa", salary: "KSH 80,000", type: "Part-Time", image: "https://via.placeholder.com/50" },
  { title: "Data Entry Clerk", category: "Jobs", location: "Nakuru", salary: "KSH 40,000", type: "Remote", image: "https://via.placeholder.com/50" },
  { title: "Content Writer", category: "Jobs", location: "Nairobi", salary: "KSH 60,000", type: "Freelance", image: "https://via.placeholder.com/50" },
  { title: "Customer Support", category: "Jobs", location: "Mombasa", salary: "KSH 45,000", type: "Full-Time", image: "https://via.placeholder.com/50" },
  { title: "Product Manager", category: "Jobs", location: "Nairobi", salary: "KSH 150,000", type: "Full-Time", image: "https://via.placeholder.com/50" },
  { title: "HR Specialist", category: "Jobs", location: "Kisumu", salary: "KSH 90,000", type: "Remote", image: "https://via.placeholder.com/50" },
  
  // Service Providers (Real names and titles)
  { title: "John Doe", category: "Service Providers", location: "Nairobi", rate: "KSH 1,500/hr", availability: "24/7", image: "https://via.placeholder.com/50?text=John" },
  { title: "Jane Smith", category: "Service Providers", location: "Kisumu", rate: "KSH 2,000/hr", availability: "9 AM - 5 PM", image: "https://via.placeholder.com/50?text=Jane" },
  { title: "Peter Johnson", category: "Service Providers", location: "Nakuru", rate: "KSH 1,200/hr", availability: "Mon-Fri", image: "https://via.placeholder.com/50?text=Peter" },
  { title: "Lucy Brown", category: "Service Providers", location: "Mombasa", rate: "KSH 800/hr", availability: "24/7", image: "https://via.placeholder.com/50?text=Lucy" },
  { title: "Mike Williams", category: "Service Providers", location: "Nairobi", rate: "KSH 1,000/hr", availability: "Mon-Sat", image: "https://via.placeholder.com/50?text=Mike" },
  { title: "Sarah Lee", category: "Service Providers", location: "Kisumu", rate: "KSH 2,500/hr", availability: "Mon-Fri", image: "https://via.placeholder.com/50?text=Sarah" },
  { title: "David Evans", category: "Service Providers", location: "Mombasa", rate: "KSH 600/hr", availability: "Weekdays", image: "https://via.placeholder.com/50?text=David" },

  // Housing
  { title: "2 Bedroom Apartment", category: "Housing", location: "Nairobi", price: "KSH 35,000/month", type: "Rental", image: "https://via.placeholder.com/50" },
  { title: "4 Bedroom House", category: "Housing", location: "Mombasa", price: "KSH 8M", type: "For Sale", image: "https://via.placeholder.com/50" },
  { title: "1 Bedroom Studio", category: "Housing", location: "Nakuru", price: "KSH 15,000/month", type: "Rental", image: "https://via.placeholder.com/50" },
  { title: "5 Bedroom Villa", category: "Housing", location: "Kisumu", price: "KSH 15M", type: "For Sale", image: "https://via.placeholder.com/50" },
  { title: "3 Bedroom House", category: "Housing", location: "Eldoret", price: "KSH 7M", type: "For Sale", image: "https://via.placeholder.com/50" },
  { title: "1 Bedroom Condo", category: "Housing", location: "Nairobi", price: "KSH 20,000/month", type: "Rental", image: "https://via.placeholder.com/50" },
  { title: "6 Bedroom Mansion", category: "Housing", location: "Mombasa", price: "KSH 25M", type: "For Sale", image: "https://via.placeholder.com/50" },
];

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Jobs");
  const [selectedLocation, setSelectedLocation] = useState("Nairobi");
  const [isFocused, setIsFocused] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const placeholderText = {
    Jobs: "Search for jobs...",
    "Service Providers": "Search for service providers...",
    Housing: "Search for houses...",
  }[selectedCategory];

  const filteredResults = searchData.filter(
    (item) =>
      item.category === selectedCategory &&
      item.location === selectedLocation &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedResults = showMore ? filteredResults : filteredResults.slice(0, 5);
  const hasMoreResults = filteredResults.length > 5;

  return (
    <div className="py-8 px-8 text-center relative">
      <div className="flex flex-col items-center space-y-6">
        {/* Category and Location Dropdowns */}
        <div className="flex space-x-4">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-pivotaNavy py-2 px-4 text-sm font-semibold text-pivotaWhite shadow-md focus:outline-none">
              {selectedCategory}
              <ChevronDownIcon className="w-4 h-4 text-pivotaWhite" />
            </MenuButton>
            <MenuItems className="absolute mt-2 w-40 origin-top-left bg-pivotaWhite rounded-lg shadow-lg z-10">
              {categories.map((category) => (
                <MenuItem key={category}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 ${active ? "bg-pivotaTeal text-pivotaWhite" : "text-black"}`}
                    >
                      {category}
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-pivotaNavy py-2 px-4 text-sm font-semibold text-pivotaWhite shadow-md focus:outline-none">
              {selectedLocation}
              <ChevronDownIcon className="w-4 h-4 text-pivotaWhite" />
            </MenuButton>
            <MenuItems className="absolute mt-2 w-40 origin-top-left bg-pivotaWhite rounded-lg shadow-lg z-10">
              {locations.map((location) => (
                <MenuItem key={location}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedLocation(location)}
                      className={`block w-full text-left px-4 py-2 ${active ? "bg-pivotaTeal text-pivotaWhite" : "text-black"}`}
                    >
                      {location}
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-lg mt-6">
          <input
            type="text"
            placeholder={placeholderText}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="bg-pivotaWhite text-pivotaNavy px-6 py-3 rounded-full shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-pivotaTeal"
          />
          <FaSearch className="absolute right-4 top-3 text-pivotaTeal text-lg" />
        </div>

        {/* Search Results Dropdown */}
        {(isFocused || searchQuery) && (
          <div className="relative mt-4 w-full max-w-lg mx-auto">
            <div className="absolute top-full left-0 w-full bg-pivotaWhite shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
              {displayedResults.length > 0 ? (
                displayedResults.map((item, index) => (
                  <div key={index} className="py-4 px-6 border-b border-pivotaLightGray flex items-center hover:bg-pivotaAqua transition-all duration-300 ease-in-out">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-full mr-4" />
                    <div className="flex-1">
                      <p className="font-semibold text-pivotaNavy">{item.title}</p>
                      <p className="text-sm text-pivotaTeal">{item.location}</p>
                      {item.salary && <p className="text-sm text-pivotaGold">{item.salary}</p>}
                      {item.rate && <p className="text-sm text-pivotaGold">{item.rate}</p>}
                      {item.price && <p className="text-sm text-pivotaGold">{item.price}</p>}
                      <button className="text-pivotaPurple text-sm hover:underline mt-2">View More</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-2 px-4 text-center text-sm text-pivotaNavy">No results found.</p>
              )}
            </div>
            
            {hasMoreResults && (
              <div className="text-center text-pivotaTeal mt-4">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="hover:underline"
                >
                  {showMore ? "Show Less" : "View More Results"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
