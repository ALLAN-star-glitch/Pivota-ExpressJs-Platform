"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Lottie from "lottie-react";
import AvailableListings from "./AvailableListings";
import SearchSection from "./SearchSection";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/hero-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <>
      <Head>
        <title>Pivota - Find Jobs, Services, and Homes in Africa</title>
        <meta
          name="description"
          content="Pivota connects job seekers, service providers, landlords, and tenants across Africa. Find jobs, services, and real estate listings easily."
        />
        <meta name="keywords" content="jobs in Africa, hire services, real estate Kenya, find tenants, Pivota platform" />
        <meta name="author" content="Pivota" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Pivota - Find Jobs, Services, and Homes in Africa" />
        <meta
          property="og:description"
          content="Pivota is the ultimate platform for job seekers, service providers, and real estate in Africa."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="bg-pivotaLightGray min-h-screen">
        {/* Hero Section */}
        <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20 bg-gradient-to-r from-white to-pivotaLightGray min-h-[70vh] mt-10">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-pivotaNavy leading-tight">
              Connecting You to <span className="text-pivotaTeal">Jobs</span>, <span className="text-pivotaCoral">Services</span>, and <span className="text-pivotaGold">Homes</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-pivotaTeal">
              Find opportunities and connect with the right people across Africa.
            </p>
            <p className="mt-2 text-lg font-semibold italic text-pivotaCoral">
              Pata fursa na uunganishwe na watu sahihi kote Afrika
            </p>
            
            <div className="mt-6">
            <Link href="/explore" className="px-6 py-3 bg-pivotaCoral text-white font-bold text-lg rounded-lg shadow-lg hover:bg-pivotaNavy transition">
                Get Started
              </Link>
            </div>
            <div className="mt-6 flex justify-center md:justify-start">
              <SearchSection />
            </div>
          </div>

          {/* Animation Section */}
          <div className="md:w-1/2 flex justify-center items-end">
            {animationData ? (
              <Lottie animationData={animationData} loop autoplay className="w-[90%] md:w-[500px] h-auto" />
            ) : (
              <p className="text-pivotaTeal">Loading animation...</p>
            )}
          </div>
        </section>

        {/* Available Listings Section */}
        <AvailableListings />

        {/* Bottom Section with Image and Content */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white">
          {/* Left Side - Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image src="/happy-client.png" alt="Bottom Section" width={500} height={300} className="rounded-lg shadow-lg" />
          </div>

          {/* Right Side - Content */}
          <div className="md:w-1/2 mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-pivotaNavy">Explore More Opportunities</h2>
            <p className="mt-4 text-lg text-pivotaTeal">
              Discover more jobs, services, and rental opportunities tailored for you. Join Pivota today and expand your reach across Africa.
            </p>
            <div className="mt-6">
              <Link href="/explore" className="px-6 py-3 bg-pivotaCoral text-white font-bold text-lg rounded-lg shadow-lg hover:bg-pivotaNavy transition">
               Join Pivota
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}