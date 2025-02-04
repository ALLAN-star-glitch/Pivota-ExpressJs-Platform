// app/about/page.js
import AboutPageClient from "@/components/website/AboutPageClient";

// SEO metadata for the page
export const metadata = {
  title: "About Pivota | Connecting Service Providers and Users",
  description:
    "Pivota is a platform bridging the gap between service providers and users. Find skilled professionals, job opportunities, and property listings with ease.",
  keywords: "service providers, job opportunities, property listings, Pivota platform",
  robots: "index, follow",  // Ensure search engines index the page
  openGraph: {
    title: "About Pivota",
    description:
      "Pivota connects users with trusted professionals, job opportunities, and property listings.",
    url: "https://www.pivota.com/about",
    image: "/path/to/image.jpg",  // Provide an image for social sharing
  },
  twitter: {
    card: "summary_large_image",  // Twitter card type for rich previews
    title: "About Pivota",
    description:
      "Pivota is a trusted platform that bridges the gap between service providers and users.",
    image: "/path/to/image.jpg",  // Same image used for Open Graph
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Dynamically loaded client-side content */}
      <AboutPageClient />
    </div>
  );
}
