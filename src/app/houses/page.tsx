'use client'

import Image from 'next/image';
import React, { useState } from 'react';

export default function HousesPage() {
  // Dummy data for houses
  const allHouses = [
    { id: 1, name: 'Luxury Villa', location: 'Nairobi', price: 1000000, image: '/path-to-image.jpg', type: 'Villa', bedrooms: 5, bathrooms: 4 },
    { id: 2, name: 'Cozy Apartment', location: 'Mombasa', price: 500000, image: '/path-to-image.jpg', type: 'Apartment', bedrooms: 3, bathrooms: 2 },
    { id: 3, name: 'Beach House', location: 'Mombasa', price: 700000, image: '/path-to-image.jpg', type: 'House', bedrooms: 4, bathrooms: 3 },
    { id: 4, name: 'Modern Bungalow', location: 'Nairobi', price: 850000, image: '/path-to-image.jpg', type: 'Bungalow', bedrooms: 4, bathrooms: 3 },
    { id: 5, name: 'Family Mansion', location: 'Nairobi', price: 1500000, image: '/path-to-image.jpg', type: 'Mansion', bedrooms: 6, bathrooms: 5 },
  ];

  // State for filters and houses
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredHouses, setFilteredHouses] = useState(allHouses);

  // Handle filtering logic
  const handleFilterChange = () => {
    let filteredData = allHouses;

    if (selectedLocation) {
      filteredData = filteredData.filter(house => house.location === selectedLocation);
    }

    if (selectedType) {
      filteredData = filteredData.filter(house => house.type === selectedType);
    }

    if (minPrice) {
      filteredData = filteredData.filter(house => house.price >= Number(minPrice));
    }

    if (maxPrice) {
      filteredData = filteredData.filter(house => house.price <= Number(maxPrice));
    }

    setFilteredHouses(filteredData);
  };

  // Handle charges input change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.name === 'minPrice') {
      setMinPrice(value);
    } else if (e.target.name === 'maxPrice') {
      setMaxPrice(value);
    }
  };

  return (
    <div className="bg-pivotaLightGray min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pivotaNavy text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold">Explore Our Premium Houses</h1>
          <p className="mt-4 text-lg">Find your perfect home with ease.</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse md:flex-row">
          {/* Filters Section (Left Column) */}
          <div className="w-full md:w-1/4 bg-white shadow-lg p-6 rounded-lg mr-8 sticky top-8 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold text-pivotaNavy mb-4">Filters</h3>

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

            {/* Type Filter */}
            <div className="mb-4">
              <select
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Mansion">Mansion</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <input
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceChange}
                placeholder="Min Price"
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceChange}
                placeholder="Max Price"
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
            <h3 className="text-xl font-semibold text-pivotaNavy mb-4">Available Houses</h3>

            {/* Houses Listing */}
            <div className="grid md:grid-cols-3 gap-8">
              {filteredHouses.length > 0 ? (
                filteredHouses.map((house) => (
                  <div key={house.id} className="bg-white shadow-lg rounded-lg p-6">
                    <Image
                      src={house.image}
                      alt={house.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-pivotaNavy">
                      {house.name} - {house.type}
                    </h3>
                    <p className="mt-2 text-sm text-pivotaCoral">
                      Located in {house.location}
                    </p>
                    <p className="mt-2 text-sm text-pivotaNavy">Price: KSH {house.price}</p>
                    <p className="mt-2 text-sm text-pivotaNavy">
                      Bedrooms: {house.bedrooms} | Bathrooms: {house.bathrooms}
                    </p>
                    <button className="mt-4 bg-pivotaGold text-pivotaNavy py-2 px-6 rounded-lg hover:bg-pivotaAqua transition-all w-full">
                      Contact
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-lg text-pivotaNavy">
                  No houses found based on your filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
