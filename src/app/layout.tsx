

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutChecker from "@/components/common/LayoutChecker";
import StoreProvider from "@/lib/StoreProvider";
import Provider from "@/components/common/Provider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pivotal",
  description: "Best Connection",
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
         <Provider>
      <StoreProvider>
       
        {/* Use the LayoutChecker client component for conditional rendering */}
        <LayoutChecker>
            {children}
          </LayoutChecker>

       

      </StoreProvider>

      </Provider>
      </body>

    </html>
  );
}
