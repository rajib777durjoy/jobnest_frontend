import React from 'react';
import { motion } from 'framer-motion';

const HeadingPage = ({ title, subtitle, description }) => {
    return (
        <section className="relative flex items-center justify-center  h-[500px] ">

            <motion.div
                className="relative z-10 w-[100%] text-center px-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h1 className="text-5xl md:text-6xl font-extrabold text-green-400 drop-shadow-lg">
                    {title}
                </h1>

                <h2 className="mt-4 text-white text-xl md:text-2xl  font-medium tracking-wide">
                    {subtitle}
                </h2>

                <p className="mt-6 text-white/80 text-sm md:text-base  leading-relaxed font-serif">
                    {description}
                </p>

                <div className="mt-20">
                    <button className="px-10 py-3 bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-full text-white font-semibold shadow-md">
                        Explore Jobs
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default HeadingPage;
