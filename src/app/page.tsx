import HeroSection from "@/components/website/home-page/client-components/HeroSection";
import SearchSection from "@/components/website/home-page/client-components/SearchSection";
import SuccessStories from "@/components/website/home-page/client-components/SuccessStories";
import WhatWeOffer from "@/components/website/home-page/client-components/SuccessStories";
import AvailableListings from "@/components/website/home-page/client-components/AvailableListings";
import { Metadata } from "next";
import HowItWorks from "@/components/website/home-page/client-components/HowItWorks";

export const metadata: Metadata = {
  title: "Pivota - Find Jobs, Services, and Housing Effortlessly",
  description: "Pivota connects you with job opportunities, skilled service providers, and housing options all in one place.",
  openGraph: {
    title: "Pivota - Your All-in-One Platform",
    description: "Discover jobs, hire service providers, and find your next home with ease.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Pivota Platform",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
{/* Title and Description Above Search */}
<section className="relative py-16 px-6 text-center bg-gradient-to-b from-pivotaLightGray to-white rounded-lg shadow-md">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-5">
      Discover Your Next Opportunity
    </h2>
    <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
      Whether you're searching for a job, hiring a service provider, or finding your next home, 
      Pivota connects you with the best opportunities in one place.
    </p>
    <button className="bg-pivotaTeal text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-700 transition duration-300 w-full sm:w-auto">
      Get Started Now
    </button>
  </div>

  {/* Search Section */}
  <div className="mt-12 w-full">
    <SearchSection />
  </div>
</section>




    

      <AvailableListings/>

      <HowItWorks/>

   
    </>
  );
}
