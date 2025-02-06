'use client'

import React, { useState } from 'react';

export default function JobsPage() {
  // Dummy data for job listings
  const allJobs = [
    { id: 1, title: 'Software Engineer', location: 'Nairobi', salary: 150000, type: 'Full-time', company: 'TechCorp', description: 'Develop cutting-edge software solutions.' },
    { id: 2, title: 'Project Manager', location: 'Mombasa', salary: 120000, type: 'Part-time', company: 'BuildIt', description: 'Manage projects from start to finish.' },
    { id: 3, title: 'Data Analyst', location: 'Nairobi', salary: 110000, type: 'Contract', company: 'DataScape', description: 'Analyze data and generate actionable insights.' },
    { id: 4, title: 'Sales Executive', location: 'Mombasa', salary: 90000, type: 'Full-time', company: 'MarketWorks', description: 'Lead sales efforts in the region.' },
    { id: 5, title: 'UX Designer', location: 'Nairobi', salary: 95000, type: 'Part-time', company: 'DesignPro', description: 'Create beautiful and user-friendly designs.' },
  ];

  // State for filters and job listings
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // Handle filtering logic
  const handleFilterChange = () => {
    let filteredData = allJobs;

    if (selectedLocation) {
      filteredData = filteredData.filter(job => job.location === selectedLocation);
    }

    if (selectedType) {
      filteredData = filteredData.filter(job => job.type === selectedType);
    }

    if (minSalary) {
      filteredData = filteredData.filter(job => job.salary >= Number(minSalary));
    }

    if (maxSalary) {
      filteredData = filteredData.filter(job => job.salary <= Number(maxSalary));
    }

    setFilteredJobs(filteredData);
  };

  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.name === 'minSalary') {
      setMinSalary(value);
    } else if (e.target.name === 'maxSalary') {
      setMaxSalary(value);
    }
  };

  return (
    <div className="bg-pivotaLightGray min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pivotaNavy text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold">Explore Available Job Opportunities</h1>
          <p className="mt-4 text-lg">Find your dream job with ease.</p>
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
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Salary Range Filter */}
            <div className="mb-4">
              <input
                type="number"
                name="minSalary"
                value={minSalary}
                onChange={handleSalaryChange}
                placeholder="Min Salary"
                className="bg-white text-pivotaNavy border border-pivotaLightGray rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="maxSalary"
                value={maxSalary}
                onChange={handleSalaryChange}
                placeholder="Max Salary"
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
            <h3 className="text-xl font-semibold text-pivotaNavy mb-4">Available Jobs</h3>

            {/* Jobs Listing */}
            <div className="grid md:grid-cols-3 gap-8">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-pivotaNavy">{job.title}</h3>
                    <p className="mt-2 text-sm text-pivotaCoral">
                      {job.company} | {job.location}
                    </p>
                    <p className="mt-2 text-sm text-pivotaNavy">Salary: KSH {job.salary}</p>
                    <p className="mt-2 text-sm text-pivotaNavy">Type: {job.type}</p>
                    <p className="mt-2 text-sm text-pivotaNavy">{job.description}</p>
                    <button className="mt-4 bg-pivotaGold text-pivotaNavy py-2 px-6 rounded-lg hover:bg-pivotaAqua transition-all w-full">
                      Apply Now
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-lg text-pivotaNavy">
                  No jobs found based on your filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
