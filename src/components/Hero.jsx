import React, { useState, useEffect } from "react";
import PFP from '../assets/pfp.png'
import { motion } from "motion/react";
import resume from '../assets/AnaGarciaResume.pdf';

const roles = [
  "Software Engineer",
  "Mobile Developer",
  "Full-Stack Developer",
  "React Native Developer",
];

const Hero = () => {
  const name = " Ana Garcia";
  const letters = name.split("").map((letter) => (letter === " " ? " " : letter));

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayedText === currentRole) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }

    const speed = isDeleting ? 40 : 70;
    const t = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? currentRole.slice(0, displayedText.length - 1)
          : currentRole.slice(0, displayedText.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <div className="flex flex-col items-center justify-center px-4 pt-36 md:pt-52">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-8 mb-16">
        <motion.div
          className="flex-1 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1 className="text-4xl md:text-6xl font-bold font-heading text-black">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              <span className="text-white">Hi, I'm</span>
              <span className="flex">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{
                      scale: 1.5,
                      color: "#F05023",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </div>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[#F05023] font-heading min-h-[2.5rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block ml-0.5 text-[#F05023]"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-white max-w-xl mx-auto md:mx-0 text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Passionate software engineer and recent graduate dedicated to creating meaningful, impactful, and entertaining solutions that solve real-world problems.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <a href={resume} download="AnaGarciaResume" target='_blank'>
              <motion.button
                className="bg-[#F05023] text-white px-6 py-3 rounded-lg hover:bg-[#c94018] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Download Resume
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-72 h-72 md:w-96 md:h-96"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src={PFP}
              alt="Profile"
              className="rounded-full w-full h-full object-cover shadow-xl"
              whileHover={{ rotate: 5 }}
            />
            <motion.div
              className="absolute -z-10 bg-primary/10 w-full h-full rounded-2xl -top-4 -right-4"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
