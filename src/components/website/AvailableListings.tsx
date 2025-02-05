import { FaBriefcase, FaHome, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AvailableListings() {
  // Sample listings data for each category
  const availableListings = {
    Jobs: [
      { title: "Software Engineer", location: "Nairobi", salary: "KSH 120,000", type: "Full-Time" },
      { title: "Graphic Designer", location: "Mombasa", salary: "KSH 80,000", type: "Part-Time" },
      { title: "Data Entry Clerk", location: "Nakuru", salary: "KSH 40,000", type: "Remote" },
    ],
    Services: [
      { title: "Plumbing Services", location: "Nairobi", rate: "KSH 1,500/hr", availability: "24/7" },
      { title: "Electrician", location: "Kisumu", rate: "KSH 2,000/hr", availability: "9 AM - 5 PM" },
      { title: "Private Tutor", location: "Eldoret", rate: "KSH 1,200/hr", availability: "Evenings" },
    ],
    Housing: [
      { title: "2 Bedroom Apartment", location: "Nairobi", price: "KSH 35,000/month", type: "Rental" },
      { title: "4 Bedroom House", location: "Mombasa", price: "KSH 8M", type: "For Sale" },
      { title: "Studio Apartment", location: "Kisumu", price: "KSH 18,000/month", type: "Rental" },
    ],
  };

  return (
    <div className="py-16 px-8 text-center">
      {/* Available Listings Title */}
      <h2 className="text-3xl font-semibold text-pivotaNavy mb-8">Available Listings</h2>

      {/* Listings Categories */}
      <div className="space-y-12">
        {/* Jobs Section */}
        <div>
          <h3 className="text-2xl font-semibold text-pivotaTeal mb-4 flex items-center">
            <FaBriefcase className="mr-2 text-xl" />
            Jobs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {availableListings.Jobs.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white text-pivotaNavy p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-sm">{item.location}</p>
                <p className="text-sm">Salary: {item.salary}</p>
                <p className="text-sm">Type: {item.type}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-2xl font-semibold text-pivotaTeal mb-4 flex items-center">
            <FaTools className="mr-2 text-xl" />
            Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {availableListings.Services.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white text-pivotaNavy p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-sm">{item.location}</p>
                <p className="text-sm">Rate: {item.rate}</p>
                <p className="text-sm">Availability: {item.availability}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Housing Section */}
        <div>
          <h3 className="text-2xl font-semibold text-pivotaTeal mb-4 flex items-center">
            <FaHome className="mr-2 text-xl" />
            Housing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {availableListings.Housing.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white text-pivotaNavy p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-sm">{item.location}</p>
                <p className="text-sm">Price: {item.price}</p>
                <p className="text-sm">Type: {item.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
