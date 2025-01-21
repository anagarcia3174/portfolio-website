import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { motion } from "motion/react";

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        scale: { type: "linear", visualDuration: 0.6, bounce: 0.5 },
      }}
      className="fixed top-0 left-0 right-0 flex justify-center pt-6 px-4 z-50"
    >
      <nav className="w-full max-w-7xl backdrop-filter backdrop-blur-sm bg-opacity-30 bg-gray-400 text-white shadow-lg rounded-xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold">AG</h1>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="font-medium hover:text-amber-900 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="font-medium hover:text-amber-900 transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="font-medium hover:text-amber-900 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-medium hover:text-amber-900 transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/in/anagarcia17/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-900 transition-colors"
            >
              <FaLinkedinIn size={32} className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/anagarcia3174" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-900 transition-colors"
            >
              <FaGithub size={32} className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
