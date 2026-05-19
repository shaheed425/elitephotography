import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Allow exit animation to finish
    }, 3500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const partVariants = {
    initial: { scale: 0.5, opacity: 0, x: 0, y: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      x: i.x,
      y: i.y,
      rotate: i.rotate,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        delay: i.delay || 0
      }
    }),
    exit: (i) => ({
      scale: 2,
      opacity: 0,
      x: i.x * 3,
      y: i.y * 3,
      transition: { duration: 1, ease: "easeInOut" }
    })
  };

  const parts = [
    { id: 'lens-1', x: -50, y: -50, rotate: 45, delay: 0.2 },
    { id: 'lens-2', x: 80, y: -30, rotate: -20, delay: 0.4 },
    { id: 'body-1', x: -100, y: 40, rotate: 10, delay: 0.3 },
    { id: 'body-2', x: 60, y: 80, rotate: -15, delay: 0.5 },
    { id: 'shutter', x: 0, y: -100, rotate: 0, delay: 0.6 },
    { id: 'dial', x: -120, y: -80, rotate: 90, delay: 0.7 },
  ];

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-primary flex items-center justify-center overflow-hidden"
        >
          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-[110] text-[10px] uppercase tracking-[0.3em] text-muted-light hover:text-accent transition-colors border border-white/10 px-4 py-2 md:px-6 md:py-2 backdrop-blur-sm"
          >
            Skip Intro
          </motion.button>

          {/* Central Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute z-10 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tighter mb-2">
              ELITE<span className="text-accent">STUDIO</span>
            </h1>
            <div className="h-[1px] w-24 bg-accent mx-auto mb-4" />
            <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-medium">
              Cinematic Excellence
            </p>
          </motion.div>

          {/* Spreading Camera Parts */}
          <div className="relative w-full max-w-sm md:w-96 md:h-96 aspect-square flex items-center justify-center">
            {parts.map((part, i) => (
              <motion.div
                key={part.id}
                custom={part}
                variants={partVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Detailed Camera Part Shapes */}
                {part.id.includes('lens') ? (
                  <div className="border-4 border-accent/30 rounded-full w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
                    <div className="border-2 border-accent/20 rounded-full w-20 h-20 md:w-32 md:h-32 bg-accent/5 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                    </div>
                  </div>
                ) : part.id.includes('body') ? (
                  <div className="border-2 border-accent/20 rounded-lg w-40 h-24 md:w-64 md:h-40 bg-primary-light/50 backdrop-blur-md" />
                ) : part.id === 'shutter' ? (
                  <div className="w-24 h-24 md:w-40 md:h-40 border-2 border-accent/40 rounded-full relative">
                    {[...Array(8)].map((_, j) => (
                      <div 
                        key={j} 
                        className="absolute top-1/2 left-1/2 w-full h-[1px] bg-accent/30 origin-left"
                        style={{ transform: `rotate(${j * 45}deg) translateX(-50%)` }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-8 h-8 md:w-12 md:h-12 border border-accent/30 rounded-md bg-accent/10" />
                )}
              </motion.div>
            ))}
            
            {/* Shutter Blade Effect */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center opacity-10"
            >
              <div className="w-[150vw] md:w-[500px] h-[2px] bg-accent absolute" />
              <div className="w-[150vw] md:w-[500px] h-[2px] bg-accent rotate-45 absolute" />
              <div className="w-[150vw] md:w-[500px] h-[2px] bg-accent rotate-90 absolute" />
              <div className="w-[150vw] md:w-[500px] h-[2px] bg-accent rotate-135 absolute" />
            </motion.div>
          </div>

          {/* Flash Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="absolute inset-0 bg-white pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
