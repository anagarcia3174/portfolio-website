import React from "react";
import { useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaGithub,
  FaGit,
  FaFlutter,
  FaDartLang,
  FaGolang,
  FaJava,
} from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import { IoLogoJavascript, IoLogoFirebase } from "react-icons/io5";
import { SiMongodb, SiTailwindcss, SiVercel } from "react-icons/si";

const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true, amount: 0.5 });

  const skillGroups = [
    {
      category: "Languages",
      skills: [
        {
          name: "JavaScript",
          icon: <IoLogoJavascript size={48} />,
          color: "#F7DF1E",
        },
        { name: "Dart", icon: <FaDartLang size={48} />, color: "#0175C2" },
        { name: "GOlang", icon: <FaGolang size={48} />, color: "#00ADD8" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React", icon: <FaReact size={48} />, color: "#61DAFB" },
        { name: "Node.js", icon: <FaNodeJs size={48} />, color: "#339933" },
        { name: "Flutter", icon: <FaFlutter size={48} />, color: "#02569B" },
        {
          name: "Bootstrap",
          icon: <FaBootstrap size={48} />,
          color: "#7952B3",
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss size={48} />,
          color: "#06B6D4",
        },
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        {
          name: "Firebase",
          icon: <IoLogoFirebase size={48} />,
          color: "#FFCA28",
        },
        { name: "MongoDB", icon: <SiMongodb size={48} />, color: "#47A248" },
        { name: "Git", icon: <FaGit size={48} />, color: "#F05032" },
        { name: "GitHub", icon: <FaGithub size={48} />, color: "#181717" },
        { name: "Vercel", icon: <SiVercel size={48} />, color: "#000000" },
      ],
    },
  ];

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const groupVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const skillVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full bg-transparent mt-8 md:mt-0">
      <div className="flex flex-col items-center p-4 md:p-8">
        <motion.h1
          ref={ref2}
          variants={textVariants}
          initial="hidden"
          animate={isInView2 ? "visible" : "hidden"}
          className="text-3xl md:text-4xl font-bold text-amber-900 mb-8"
        >
          Technical Skills
        </motion.h1>

        <div
          ref={containerRef}
          className="w-full max-w-7xl overflow-x-auto hide-scrollbar"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-nowrap gap-2 md:gap-6 pb-4 min-w-min md:grid md:grid-cols-3 md:flex-wrap"
          >
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                variants={groupVariants}
                className="flex-none w-[85vw] sm:w-[400px] md:w-full"
              >
                <h2 className="text-xl text-white font-medium mb-4 text-center">
                  {group.category}
                </h2>

                <div className="overflow-y-auto max-h-[500px] hide-scrollbar p-2">
                  <div className="grid grid-cols-2 gap-4">
                    {group.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        variants={skillVariants}
                        whileHover={{
                          scale: 1.05,
                          boxShadow:
                            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        className="flex flex-col items-center p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 shadow-lg justify-center text-center"
                      >
                        <motion.div
                          className="text-3xl md:text-4xl mb-2"
                          style={{ color: skill.color }}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {skill.icon}
                        </motion.div>
                        <h3 className="text-base md:text-lg font-semibold text-white">
                          {skill.name}
                        </h3>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding-right: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Skills;
