"use client";

import React from "react";
import { FaShieldAlt, FaUsers, FaLightbulb, FaHandshake, FaSearch, FaClipboardCheck, FaGlobe, FaPeopleCarry, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutPageClient() {
  const router = useRouter();
  return (
    <div className="mt-20">
      {/* Introduction Section */}
      <motion.div
        className="py-16 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-5xl font-extrabold mb-6">About Pivota</h1>
          <p className="text-lg mb-10 leading-relaxed">
            Pivota is a trusted platform that connects users with skilled service providers, job opportunities, and property listings.
          </p>
          <Image src="/about-image.webp" alt="Pivota Community" width={800} height={400} className="rounded-2xl shadow-lg mx-auto" />
        </div>
      </motion.div>

      {/* Mission & Vision Section */}
      <div className="bg-pivotaLightGray text-pivotaNavy py-16 px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Our Mission & Vision</h2>
          <p className="text-lg">Pivota aims to empower individuals by providing a secure and efficient digital platform.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <motion.div className="py-16 px-8 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6 text-pivotaNavy">How Pivota Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={FaSearch} title="Discover" description="Find jobs, service providers, or housing that match your needs." color="pivotaAqua" />
          <FeatureCard icon={FaHandshake} title="Connect" description="Engage with trusted professionals and employers securely." color="pivotaGold" />
          <FeatureCard icon={FaClipboardCheck} title="Succeed" description="Enjoy reliable services, employment opportunities, and housing solutions." color="pivotaPurple" />
        </div>
      </motion.div>

      {/* Features & Benefits */}
      <div className="bg-pivotaNavy text-white py-16 px-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Features & Benefits</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={FaShieldAlt} title="Security & Trust" description="Ensuring a safe and reliable platform for all users." color="pivotaGold" />
          <FeatureCard icon={FaUsers} title="Community Growth" description="Building a strong network of professionals and service providers." color="pivotaPurple" />
          <FeatureCard icon={FaLightbulb} title="Innovation" description="Utilizing technology for better service delivery." color="pivotaCoral" />
        </div>
      </div>

      {/* Membership Plans */}
      <div className="bg-white py-16 px-8 text-center">
        <h2 className="text-4xl font-bold mb-6 text-pivotaNavy">Membership Plans</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <FeatureCard icon={FaGlobe} title="Free Plan" description="Access basic services for free." color="pivotaAqua" />
          <FeatureCard icon={FaPeopleCarry} title="Bronze Plan" description="$3.50 (KSH 500) for 3 months - 1 premium role." color="pivotaTeal" />
          <FeatureCard icon={FaPeopleCarry} title="Silver Plan" description="$6.50 (KSH 900) for 3 months - 2 premium roles." color="pivotaPurple" />
          <FeatureCard icon={FaPeopleCarry} title="Gold Plan" description="$10.50 (KSH 1500) for 6 months - All premium roles." color="pivotaGold" />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-pivotaLightGray py-16 px-8 text-center">
        <h2 className="text-4xl font-bold mb-6 text-pivotaNavy">Frequently Asked Questions</h2>
        <FeatureCard icon={FaQuestionCircle} title="How do I join Pivota?" description="Simply sign up and create your profile to start exploring services." color="pivotaTeal" />
        <FeatureCard icon={FaQuestionCircle} title="Is Pivota available outside Kenya?" description="Yes, we are expanding to serve international users." color="pivotaPurple" />
      </div>

      {/* Call to Action */}
      <motion.div className="bg-pivotaTeal text-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Pivota Today!</h2>
        <button onClick={() => router.push("/pricing")} className="bg-pivotaGold text-black px-6 py-3 rounded-full font-bold shadow-md hover:bg-yellow-400">
          Get Started
        </button>
      </motion.div>
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: React.ElementType; title: string; description: string; color: string }) => (
  <motion.div className="bg-white text-pivotaNavy p-6 rounded-2xl shadow-lg" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
    <Icon className={`text-6xl text-${color} mx-auto mb-4`} />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </motion.div>
);






