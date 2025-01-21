import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { motion, useInView } from "framer-motion";


const ContactForm = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4});
    const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true, amount: 0.4 });

    const sendEmail = async (e) => {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (isSubmitting || hasSubmitted) return;


        setIsSubmitting(true);
        setError(null);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                }
            );
            setHasSubmitted(true);
            form.current.reset();
        } catch (error) {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.4,
          },
        },
      };

      const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const formItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
    };
    return (
        <div className="h-auto p-8" ref={ref}>
            <motion.div 
                className="max-w-xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.h1
                    ref={ref2}
                    variants={textVariants}
                    className="text-3xl md:text-4xl font-bold text-amber-900 mb-8 text-center"
                >
                    Contact Me
                </motion.h1>

                {hasSubmitted ? (
                    <motion.div 
                        variants={formVariants}
                        className="backdrop-blur-md bg-gradient-to-r from-white/50 to-white/30 text-green-950 px-4 py-3 rounded relative mb-6"
                    >
                        <p className="text-center">Thank you for your message! I'll get back to you soon.</p>
                        <button 
                            onClick={() => setHasSubmitted(false)}
                            className="mt-4 w-full bg-green-700 hover:bg-green-950 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Send Another Message
                        </button>
                    </motion.div>
                ) : (
                    <motion.form 
                        className="space-y-6" 
                        ref={form} 
                        onSubmit={sendEmail}
                        variants={containerVariants}
                    >
                        {error && (
                            <motion.div 
                                variants={formItemVariants}
                                className="border bg-red-800 border-red-500 text-white px-4 py-3 rounded relative"
                            >
                                <p className="text-center">{error}</p>
                            </motion.div>
                        )}

                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label htmlFor="name" className="block text-md font-semibold text-amber-900">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 text-white bg-white/10 backdrop-blur-md border border-gray-300/50 rounded-lg placeholder:text-white text-md outline-none transition-all focus:ring-2 focus:ring-amber-900 disabled:opacity-50"
                                placeholder="Enter your name"
                            />
                        </motion.div>

                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label htmlFor="email" className="block text-md font-semibold text-amber-900">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 text-white bg-white/10 backdrop-blur-md border border-gray-300/50 rounded-lg placeholder:text-white text-md outline-none transition-all focus:ring-2 focus:ring-amber-900 disabled:opacity-50"
                                placeholder="you@example.com"
                            />
                        </motion.div>

                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label htmlFor="subject" className="block text-md font-semibold text-amber-900">
                                Subject
                            </label>
                            <input
                                id="subject"
                                type="text"
                                name="subject"
                                required
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 text-white bg-white/10 backdrop-blur-md border border-gray-300/50 rounded-lg placeholder:text-white text-md outline-none transition-all focus:ring-2 focus:ring-amber-900 disabled:opacity-50"
                                placeholder="What's this about?"
                            />
                        </motion.div>

                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label htmlFor="message" className="block text-md font-semibold text-amber-900">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                name="message"
                                required
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 text-white bg-white/10 backdrop-blur-md border border-gray-300/50 rounded-lg placeholder:text-white text-md outline-none transition-all focus:ring-2 focus:ring-amber-900 disabled:opacity-50"
                                placeholder="Your message here..."
                            ></textarea>
                        </motion.div>

                        <motion.button
                            variants={formItemVariants}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-amber-900 hover:bg-green-950 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </motion.form>
                )}
            </motion.div>
        </div>
    );
}

export default ContactForm