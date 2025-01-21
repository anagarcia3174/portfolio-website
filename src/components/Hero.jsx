import React from "react";
import PFP from '../assets/pfp.png'
import { motion } from "motion/react";
import resume from '../assets/AnaGarciaResume.pdf';

const Hero = () => {
    const name = " Ana Garcia";
    const letters = name.split("").map((letter) => (letter === " " ? "\u00A0" : letter)); // Preserve spaces

    return (
      <div className="flex flex-col items-center justify-center px-4 pt-24 md:pt-52">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-8 mb-16">
          <motion.div
            className="flex-1 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1 className="text-4xl md:text-6xl font-bold text-black">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                <span className="text-white">Hi, I'm</span>
                <span className="flex">
                  {letters.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      whileHover={{
                        scale: 1.5,
                        color: "#78350f",
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
              className="text-2xl md:text-3xl font-bold text-amber-900"
              whileHover={{ scale: 1.05 }}
            >
              Software Engineer
            </motion.h2>
            <motion.p
              className="text-white max-w-xl mx-auto md:mx-0 text-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
Passionate software engineer and recent graduate dedicated to creating meaningful, impactful, and entertaining solutions that solve real-world problems.            </motion.p>
            <motion.div
              className="flex gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <a href={resume} download="AnaGarciaResume" target='_blank'>
                <motion.button
                  className="bg-amber-950 text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
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
