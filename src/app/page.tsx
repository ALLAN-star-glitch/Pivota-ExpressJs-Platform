import HeroSection from "@/components/website/home-page/client-components/HeroSection";
import SearchSection from "@/components/website/home-page/client-components/SearchSection";
import SuccessStories from "@/components/website/home-page/client-components/SuccessStories";
import WhatWeOffer from "@/components/website/home-page/client-components/SuccessStories";
import AvailableListings from "@/components/website/home-page/server-components/AvailableListings";
import { Metadata } from "next";

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
      <section className="py-16 px-8 text-center text-gray-700">
        <h2 className="text-4xl font-bold mb-4">Discover Your Next Opportunity</h2>
        <p className="text-lg mb-6">
          Whether you are looking for a job, hiring a service provider, or finding your next home, 
          Pivota connects you with the best opportunities in one place.
        </p>        
      </section>

      {/* Search Section */}
      <SearchSection />

      <AvailableListings/>

   
    </>
  );
}
