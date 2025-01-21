import React from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { useRef } from "react";

const DownArrow = () => {
    const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });


  const lineVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { 
      opacity: 1, 
      scaleX: 1,
      transition: { duration: 0.8 }
    }
  };

  const arrowVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      y: [0, 10, 0],
      transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
    }}
  };

  return (
    <div ref={ref} className="flex justify-center items-center my-8 space-x-4">
            <motion.div 
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="border-t border-gray-300 flex-1 max-w-[80px] sm:max-w-[120px] md:max-w-[160px] lg:max-w-[200px] origin-left"
            />

            <motion.div
                className="text-white"
                variants={arrowVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <HiOutlineChevronDoubleDown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </motion.div>

            <motion.div 
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="border-t border-gray-300 flex-1 max-w-[80px] sm:max-w-[120px] md:max-w-[160px] lg:max-w-[200px] origin-right"
            />
        </div>
  );
};

export default DownArrow;
