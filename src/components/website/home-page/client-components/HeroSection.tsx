"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
    {
        // This slide can include SEO metadata content
        image: "/pivota platform.webp", // Example image for SEO content slide
        title: "Pivota - Find Jobs, Services, and Housing Effortlessly",
        description: "Pivota connects you with job opportunities, skilled service providers, and housing options all in one place. Discover jobs, hire service providers, and find your next home with ease.",
        buttonText: "Get Started",
        link: "/signup", // Optional button action
      },
  {
    image: "/jobman.webp",
    title: "Find Your Dream Job",
    description: "Explore thousands of job listings from top companies worldwide.",
    buttonText: "Find Jobs",
    link: "/jobs",
  },
  {
    image: "/serviceman.webp",
    title: "Connect with Service Providers",
    description: "Find trusted electricians, plumbers, tutors, and more in your area.",
    buttonText: "Find Services",
    link: "/services",
  },
  {
    image: "/rentalhouse.webp",
    title: "Discover Your Perfect Home",
    description: "Browse rental and property listings tailored to your needs.",
    buttonText: "Browse Listings",
    link: "/housing",
  },
  {
    image: "/community.webp",
    title: "Expand Your Network",
    description: "Join a growing community of professionals and service providers.",
    buttonText: "Join Now",
    link: "/signup",
  },
  
];

export default function HeroSection() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <motion.div
        key={currentIndex}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-1000"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-2xl text-white"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{slides[currentIndex].title}</h1>
          <p className="text-lg mb-6">{slides[currentIndex].description}</p>
          <button
            onClick={() => router.push(slides[currentIndex].link)}
            className="bg-pivotaGold text-black px-6 py-3 rounded-full font-bold shadow-md hover:bg-yellow-400 transition"
          >
            {slides[currentIndex].buttonText}
          </button>
        </motion.div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-80 transition"
      >
        <FaArrowLeft className="text-2xl text-pivotaTeal" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-80 transition"
      >
        <FaArrowRight className="text-2xl text-pivotaTeal" />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-pivotaGold scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
