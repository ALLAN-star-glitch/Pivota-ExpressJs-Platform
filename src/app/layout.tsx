

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutChecker from "@/components/common/LayoutChecker";
import StoreProvider from "@/lib/StoreProvider";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Pivota - Find Jobs, Services, and Homes in Africa",
  description: "Pivota connects job seekers, service providers, landlords, and tenants across Africa. Find jobs, services, and real estate listings easily.",
  keywords: "jobs in Africa, hire services, real estate Kenya, find tenants, Pivota platform",
  openGraph: {
    title: "Pivota - Find Jobs, Services, and Homes in Africa",
    description: "Pivota is the ultimate platform for job seekers, service providers, and real estate in Africa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
      <StoreProvider>
       
        {/* Use the LayoutChecker client component for conditional rendering */}
        <LayoutChecker>
            {children}
          </LayoutChecker>

       

      </StoreProvider>

    
      </body>

    </html>
  );
}
