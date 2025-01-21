import React from "react";
import { FaGithub } from "react-icons/fa6";
import { MdOutlineOpenInNew } from "react-icons/md";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Projects = ({ name, about, link, github, stack, image }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth easing
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {name == "Comments!" && (
        <motion.h1
          ref={ref2}
          variants={textVariants}
          initial="hidden"
          animate={isInView2 ? "visible" : "hidden"}
          className="text-3xl md:text-4xl font-bold text-amber-900 mb-8 text-center"
        >
          Projects
        </motion.h1>
      )}

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.05 }}
        className="rounded-2xl backdrop-blur-md bg-gradient-to-r from-white/10 to-white/5 
          grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-10 p-6 
          transform transition-all duration-700 ease-out my-6"
      >
        <motion.div
          variants={childVariants}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <div className="w-full h-72 max-w-[300px] relative">
          <img
            src={image}
            className="rounded-lg absolute inset-0 w-full h-full object-cover"
          />
          </div>

        </motion.div>

        <motion.div
          variants={childVariants}
          className="flex flex-col gap-4 lg:col-span-7"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white">
              {name}
            </h2>
            <div className="flex gap-3 md:gap-4 text-xl sm:text-2xl xl:text-3xl">
              {link && (
                <motion.a
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.95 }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 transition-colors duration-300"
                  aria-label="View Live Demo"
                >
                  <MdOutlineOpenInNew />
                </motion.a>
              )}
              {github && (
                <motion.a
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.95 }}
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 transition-colors duration-300"
                  aria-label="View Live Demo"
                >
                  <FaGithub />
                </motion.a>
              )}
            </div>
          </div>
          <p className="text-base text-white/70">{about}</p>
          <div className="flex gap-3 md:gap-4 flex-wrap">
            {stack.map((item) => (
              <motion.p
                variants={childVariants}
                key={item}
                className="uppercase whitespace-nowrap bg-gradient-to-br from-amber-800 to-amber-900 px-2 py-1.5 md:py-2 md:px-3 rounded text-sm md:text-base font-medium text-white"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Projects;
