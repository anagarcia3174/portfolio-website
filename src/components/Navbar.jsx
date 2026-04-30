import React, { useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navLinks = ["home", "skills", "projects", "contact"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        scale: { type: "linear", visualDuration: 0.6, bounce: 0.5 },
      }}
      className="fixed top-0 left-0 right-0 flex flex-col items-center pt-6 px-4 z-50"
    >
      <nav className="w-full max-w-7xl backdrop-filter backdrop-blur-sm bg-opacity-30 bg-gray-400 text-white shadow-lg rounded-xl px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold font-heading">AG</h1>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="capitalize font-medium hover:text-[#F05023] transition-colors"
              >
                {id}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/anagarcia17/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F05023] transition-colors"
            >
              <FaLinkedinIn size={32} className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/anagarcia3174"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F05023] transition-colors"
            >
              <FaGithub size={32} className="w-5 h-5" />
            </a>
            <button
              className="md:hidden text-white p-1"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 rounded-xl bg-gray-800/80 backdrop-blur-md border border-white/20 w-full max-w-7xl"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setIsMenuOpen(false);
                  }}
                  className="capitalize text-left text-white font-medium hover:text-[#F05023] transition-colors py-1"
                >
                  {id}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
