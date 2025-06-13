"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Briefcase,
  Users,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gray-900 text-white py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              href="#home"
              className="text-2xl font-bold text-purple-400 mb-4 inline-block"
            >
              Muneeb Nawaz
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Full Stack Developer specializing in MERN stack and React Native
              development with 6+ years of experience building innovative web
              and mobile solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/MnbNwz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/muneeb-nawaz-a6272419b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="https://twitter.com/muneeb-nawaz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="mailto:muneebnawaz2018@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail size={24} />
              </Link>
              <Link
                href="https://www.fiverr.com/s/xXVE74B"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                title="Hire me on Fiverr"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M30.7087,4.5H23.2355c-5.4473,0-10.1982,4.2944-9.88,12.0757H7.9886v7.2454h5.7247V43.5H22.211V23.8211h8.8555V43.5h8.9449V16.5758H22.7478V14.6973a2.8052,2.8052,0,0,1,2.8484-2.9518h5.1125Z" />
                </svg>
              </Link>
              <Link
                href="https://www.upwork.com/freelancers/~01113fcaa500ee9108?mp_source=share"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                title="Hire me on Upwork"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M24.75 17.542c-1.469 0-2.849-0.62-4.099-1.635l0.302-1.432 0.010-0.057c0.276-1.521 1.13-4.078 3.786-4.078 1.99 0 3.604 1.615 3.604 3.604 0 1.984-1.615 3.599-3.604 3.599zM24.75 6.693c-3.385 0-6.016 2.198-7.083 5.818-1.625-2.443-2.865-5.38-3.583-7.854h-3.646v9.484c-0.005 1.875-1.521 3.391-3.396 3.396-1.875-0.005-3.391-1.526-3.396-3.396v-9.484h-3.646v9.484c0 3.885 3.161 7.068 7.042 7.068 3.885 0 7.042-3.182 7.042-7.068v-1.589c0.708 1.474 1.578 2.974 2.635 4.297l-2.234 10.495h3.729l1.62-7.615c1.417 0.906 3.047 1.479 4.917 1.479 4 0 7.25-3.271 7.25-7.266 0-4-3.25-7.25-7.25-7.25z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#home"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#web-projects"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Web Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#mobile-projects"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Mobile Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Info
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a
                  href="mailto:muneebnawaz2018@gmail.com"
                  className="hover:text-purple-400 transition-colors"
                >
                  muneebnawaz2018@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Phone:</span>
                <a
                  href="tel:00923027577308"
                  className="hover:text-purple-400 transition-colors"
                >
                  +92 302 7577308
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Location:</span>
                <a
                  href="https://maps.google.com/?q=Punjab,Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  Punjab, Pakistan
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Muneeb Nawaz. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
