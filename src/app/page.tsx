import NavbarWebsite from "@/components/website/NavbarWebsite";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <main className="relative">
        {/* Hero Section with Image Overlay */}
        <section className="relative text-pivotaWhite text-center py-60 px-6">
          
          <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Overlay */}
          <Image
            src="/signup-image.webp" // Path should be relative to the public directory
            alt="Hero Image"
            layout="fill" // Ensures the image fills the section
            objectFit="cover" // Makes the image cover the section
            objectPosition="center top" // Adjusts the focus point of the image
            className="absolute inset-0 z-[-1]"
          />
          <div className="max-w-4xl mx-auto relative z-0">
            <h1 className="text-5xl font-extrabold text-white mb-6">Welcome to Pivota</h1>
            <p className="text-xl mb-8">Your one-stop platform to connect with trusted service providers, find rental properties, and discover job opportunities.</p>
            <div className="space-x-4">
              <button className="bg-pivotaTeal text-pivotaWhite py-3 px-6 rounded-lg hover:bg-pivotaAqua transition">Find Services</button>
              <button className="bg-pivotaWhite text-pivotaNavy py-3 px-6 rounded-lg border border-pivotaNavy hover:bg-pivotaLightGray transition">Get a Job</button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-pivotaLightGray">
          <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
          <div className="max-w-screen-lg mx-auto grid md:grid-cols-3 gap-12">
            <div className="bg-pivotaWhite p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">1. Browse Services</h3>
              <p>Search for service providers, browse profiles, and find the help you need.</p>
            </div>
            <div className="bg-pivotaWhite p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">2. Apply for Jobs</h3>
              <p>Browse job listings, apply to opportunities, and find your next role.</p>
            </div>
            <div className="bg-pivotaWhite p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">3. Find Rentals</h3>
              <p>Explore rental properties and find the perfect place to call home.</p>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-20 px-6 bg-pivotaWhite">
          <h2 className="text-3xl font-semibold text-center mb-12">Featured Services</h2>
          <div className="max-w-screen-lg mx-auto grid md:grid-cols-3 gap-12">
            <div className="bg-pivotaTeal text-pivotaWhite p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Plumbing</h3>
              <p>Connect with licensed plumbers in your area for quick and reliable services.</p>
            </div>
            <div className="bg-pivotaTeal text-pivotaWhite p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Electrical</h3>
              <p>Find certified electricians for any repair, installation, or maintenance needs.</p>
            </div>
            <div className="bg-pivotaTeal text-pivotaWhite p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Counseling</h3>
              <p>Book a session with experienced counselors to support your mental well-being.</p>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-20 px-6 bg-pivotaNavy text-pivotaWhite text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to get started?</h2>
          <Link href="/pricing">
          <button className="bg-pivotaGold text-pivotaWhite py-3 px-6 rounded-lg hover:bg-pivotaCoral transition">Sign Up Now</button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
