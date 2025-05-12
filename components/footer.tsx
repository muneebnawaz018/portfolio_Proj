"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

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
            <Link href="#home" className="text-2xl font-bold text-purple-400 mb-4 inline-block">
              Muneeb Nawaz
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Full Stack Developer specializing in MERN stack and React Native development with 6+ years of experience
              building innovative web and mobile solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/MnbNwz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/muneeb-nawaz-a6272419b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://twitter.com/muneeb-nawaz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="mailto:muneebnawaz2018@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#web-projects" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Web Projects
                </Link>
              </li>
              <li>
                <Link href="#mobile-projects" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Mobile Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a href="mailto:muneebnawaz2018@gmail.com" className="hover:text-purple-400 transition-colors">
                  muneebnawaz2018@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Phone:</span>
                <a href="tel:00923027577308" className="hover:text-purple-400 transition-colors">
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
          <p className="text-gray-400">&copy; {currentYear} Muneeb Nawaz. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
