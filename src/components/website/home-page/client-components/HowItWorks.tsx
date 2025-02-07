'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaUserPlus, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const steps = [
  {
    icon: <FaSearch className="text-pivotaTeal text-4xl mb-4" />,
    title: 'Explore Listings',
    description: 'Search for jobs, service providers, or properties that match your needs.'
  },
  {
    icon: <FaUserPlus className="text-pivotaTeal text-4xl mb-4" />,
    title: 'Create an Account',
    description: 'Sign up for free or upgrade to a premium plan for more features.'
  },
  {
    icon: <FaHandshake className="text-pivotaTeal text-4xl mb-4" />,
    title: 'Connect & Engage',
    description: 'Contact employers, service providers, or landlords easily and securely.'
  },
  {
    icon: <FaShieldAlt className="text-pivotaTeal text-4xl mb-4" />,
    title: 'Secure & Transact',
    description: 'Make informed decisions and complete transactions with confidence.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-pivotaLightGray text-center">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-pivotaNavy mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Pivota Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-pivotaNavy mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.a 
          href="/signup" 
          className="mt-10 inline-block bg-pivotaTeal text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-700 transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Get Started Today
        </motion.a>
      </div>
    </section>
  );
}
