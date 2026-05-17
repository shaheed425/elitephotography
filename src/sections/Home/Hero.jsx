import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block text-accent uppercase tracking-[0.5em] text-xs font-semibold mb-6">
            Award Winning Photography Studio
          </span>
          <h1 className="text-5xl md:text-8xl font-bold font-serif text-white mb-8 leading-tight">
            Capturing the <br /> 
            <span className="italic text-accent">Art</span> of Moments
          </h1>
          <p className="text-secondary-dark text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Professional photography that tells your unique story through cinematic visuals and artistic precision.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium w-full md:w-auto"
            >
              View Portfolio
            </motion.a>
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white/20 text-white uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-500 w-full md:w-auto"
            >
              Book a Shoot
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-light">Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} className="text-accent" />
        </motion.div>
      </motion.div>

      {/* Animated Lines/Decorations */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block"></div>
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
