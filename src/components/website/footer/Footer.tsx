"use client";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="relative text-pivotaWhite py-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('/about-image.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-pivotaTeal bg-opacity-60 pointer-events-none"></div>

      <div className="container mx-auto text-center md:text-left px-4 max-w-6xl relative z-5">
        {/* Footer Main Content */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
          <p className="text-lg mb-6">Follow us on our social media for updates and more!</p>

          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                target="_blank"
                className="text-3xl hover:text-pivotaGold transition-all"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer Navigation Links */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[
            { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
            { title: "Support", links: ["FAQs", "Help Center", "Privacy Policy", "Terms of Service"] },
            { title: "Connect", links: ["LinkedIn", "Twitter", "Facebook", "Instagram"] },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-pivotaGold">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Subscribe Section */}
          <div>
          <h4 className="font-semibold mb-4">Subscribe</h4>
          <form className="flex w-full max-w-sm mx-auto sm:max-w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-l-full text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-pivotaGold text-black px-6 py-3 rounded-r-full transform hover:scale-105 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-12 text-sm"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>&copy; {new Date().getFullYear()} Pivota. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
