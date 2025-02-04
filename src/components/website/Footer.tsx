"use client"; // Indicate it's a server-side component

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion"; // Motion animations

export default function Footer() {
  return (
    <motion.footer
      className="relative text-pivotaWhite py-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('/about-image.webp')", // Add your background image here
        backgroundSize: "cover", // Ensure the background image covers the entire footer
        backgroundPosition: "center", // Center the image in the footer
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="container mx-auto text-center max-w-6xl relative z-10">
        {/* Footer Main Content */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
          <p className="text-lg mb-6">Follow us on our social media for updates and more!</p>

          {/* Social Media Links */}
          <div className="flex justify-center gap-8 mb-6">
            <motion.a
              href="#"
              target="_blank"
              className="text-3xl hover:text-pivotaGold transition-all"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              className="text-3xl hover:text-pivotaGold transition-all"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              className="text-3xl hover:text-pivotaGold transition-all"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              className="text-3xl hover:text-pivotaGold transition-all"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </motion.div>

        {/* Footer Navigation Links */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul>
              <li><a href="#" className="hover:text-pivotaGold">About Us</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Careers</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Blog</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul>
              <li><a href="#" className="hover:text-pivotaGold">FAQs</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Help Center</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul>
              <li><a href="#" className="hover:text-pivotaGold">LinkedIn</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Twitter</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Facebook</a></li>
              <li><a href="#" className="hover:text-pivotaGold">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Subscribe</h4>
            <form className="flex items-center justify-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-full text-black focus:outline-none"
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
