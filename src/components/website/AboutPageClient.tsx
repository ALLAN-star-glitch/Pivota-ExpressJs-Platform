// app/components/website/AboutPageClient.js
"use client"; // Tells Next.js that this is a client component

import React from "react";
import { FaShieldAlt, FaUsers, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function AboutPageClient() {

    const router = useRouter();
  return (
    <motion.div
      className="bg-gradient-to-r from-pivotaTeal to-pivotaAqua text-pivotaWhite py-16 px-8 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center max-w-5xl">
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Pivota
        </motion.h1>

        <motion.p
          className="text-lg mb-10 leading-relaxed"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pivota is a trusted platform that bridges the gap between service 
          providers and users. Whether you're looking for skilled professionals, 
          job opportunities, or property listings, we ensure a seamless and 
          secure experience.
        </motion.p>

        {/* Hero Image */}
        <div className="mb-12">
          <Image
            src="/about-image.webp"
            alt="Pivota Community"
            width={800}
            height={400}
            className="rounded-2xl shadow-lg mx-auto"
          />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="bg-pivotaNavy text-white p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaShieldAlt className="text-6xl text-pivotaGold mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Security & Trust</h3>
            <p className="text-sm">Your safety and security are our top priorities.</p>
          </motion.div>

          <motion.div
            className="bg-pivotaNavy text-white p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaUsers className="text-6xl text-pivotaPurple mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-sm">We connect users and professionals for mutual growth.</p>
          </motion.div>

          <motion.div
            className="bg-pivotaNavy text-white p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaLightbulb className="text-6xl text-pivotaCoral mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-sm">Innovative solutions for enhanced service delivery.</p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold mb-4">Join Pivota Today!</h2>
          <p className="text-lg mb-6">Start connecting with trusted service providers and opportunities.</p>
          <button onClick ={()=>router.push("/pricing")} className="bg-pivotaGold text-black px-6 py-3 rounded-full font-bold shadow-md hover:bg-yellow-400">
            Get Started
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
