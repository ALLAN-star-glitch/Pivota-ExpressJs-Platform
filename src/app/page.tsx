// app/page.tsx (Server Component)
import HomePageClient from "@/components/website/HomePageComponent";
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
  return <HomePageClient />;
}
