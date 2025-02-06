"use client"

import React, { useState } from 'react';

export default function Page() {
  // Dummy data for service providers
  const allProviders = [
    { id: 1, name: 'John Doe', category: 'Electrician', location: 'Nairobi', image: '/path-to-image.jpg', rating: 4.5, reviews: 20, charges: 1000 },
    { id: 2, name: 'Jane Smith', category: 'Plumber', location: 'Mombasa', image: '/path-to-image.jpg', rating: 4.8, reviews: 30, charges: 1500 },
    { id: 3, name: 'Samuel L. Jackson', category: 'Tutor', location: 'Nairobi', image: '/path-to-image.jpg', rating: 4.2, reviews: 15, charges: 800 },
    { id: 4, name: 'Linda Carter', category: 'Lawyer', location: 'Mombasa', image: '/path-to-image.jpg', rating: 4.7, reviews: 25, charges: 3000 },
    { id: 5, name: 'Michael Bay', category: 'Electrician', location: 'Nairobi', image: '/path-to-image.jpg', rating: 4.6, reviews: 18, charges: 1200 },
  ];

  // State for filters and service providers
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [minCharges, setMinCharges] = useState('');
  const [maxCharges, setMaxCharges] = useState('');
  const [filteredProviders, setFilteredProviders] = useState(allProviders);

  // Handle filtering logic
  const handleFilterChange = () => {
    let filteredData = allProviders;

    if (selectedCategory) {
      filteredData = filteredData.filter(provider => provider.category === selectedCategory);
    }

    if (selectedLocation) {
      filteredData = filteredData.filter(provider => provider.location === selectedLocation);
    }

    if (minCharges) {
      filteredData = filteredData.filter(provider => provider.charges >= Number(minCharges));
    }

    if (maxCharges) {
      filteredData = filteredData.filter(provider => provider.charges <= Number(maxCharges));
    }

    setFilteredProviders(filteredData);
  };

  // Handle search functionality
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filteredData = allProviders.filter(provider => provider.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredProviders(filteredData);
  };

  // Handle charges input change
  const handleChargesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.name === 'minCharges') {
      setMinCharges(value);
    } else if (e.target.name === 'maxCharges') {
      setMaxCharges(value);
    }
  };

  return (
    <div className="bg-pivotaLightGray min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pivotaNavy text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold">Explore Our Trusted Service Providers</h1>
          <p className="mt-4 text-lg">Find professionals across various categories and hire with confidence.</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse md:flex-row">
          {/* Filters Section (Left Column) */}
          <div className="w-full md:w-1/4 bg-white shadow-lg p-6 rounded-lg mr-8 sticky top-8 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold text-pivotaNavy mb-4">Filters</h3>

            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name..."
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <select
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Electrician">Electricians</option>
                <option value="Plumber">Plumbers</option>
                <option value="Tutor">Tutors</option>
                <option value="Lawyer">Lawyers</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <select
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
              </select>
            </div>

            {/* Charges Filter */}
            <div className="mb-4">
              <input
                type="number"
                name="minCharges"
                value={minCharges}
                onChange={handleChargesChange}
                placeholder="Min Charges"
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="maxCharges"
                value={maxCharges}
                onChange={handleChargesChange}
                placeholder="Max Charges"
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
              />
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={handleFilterChange}
              className="bg-pivotaGold text-pivotaNavy py-2 px-6 rounded-lg hover:bg-pivotaAqua transition-all w-full"
            >
              Apply Filters
            </button>
          </div>

          {/* Results Section (Right Column) */}
          <div className="w-full md:w-3/4 bg-white shadow-lg p-6 rounded-lg overflow-y-auto">
            <h3 className="text-xl font-semibold text-pivotaNavy mb-4">Service Providers</h3>

            {/* Service Providers Listing */}
            <div className="grid md:grid-cols-3 gap-8">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <div key={provider.id} className="bg-white shadow-lg rounded-lg p-6">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-pivotaNavy">
                      {provider.name} - {provider.category}
                    </h3>
                    <p className="mt-2 text-sm text-pivotaCoral">
                      Expert in {provider.category.toLowerCase()} services
                    </p>
                    <p className="mt-2 text-sm text-pivotaNavy">Charges: KSH {provider.charges}</p>
                    <div className="mt-3 flex items-center space-x-2 text-pivotaGold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.395.288-.874.053-1.017-.416L1 12.071l-2.595-.207c-.392-.032-.709-.29-.766-.666-.057-.377.186-.745.537-.857l2.264-.858L3.29 7.56c.263-.38.77-.38 1.033 0l1.9 2.482 2.264.858c.351.112.594.48.537.857-.057.376-.374.634-.766.666l-2.595.207 1.595 2.956c.143.469-.622.704-1.017.416l-2.201-1.568-2.2 1.568z" />
                      </svg>
                      <span>{provider.rating} ({provider.reviews} reviews)</span>
                    </div>
                    <button className="mt-4 bg-pivotaGold text-pivotaNavy py-2 px-6 rounded-lg hover:bg-pivotaAqua transition-all w-full">
                      Contact
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-lg text-pivotaNavy">
                  No providers found based on your filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
