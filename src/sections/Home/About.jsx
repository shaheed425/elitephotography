import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-padding bg-primary relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Image Side */}
        <div className="w-full lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop" 
                alt="Photographer at work" 
                className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-110"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent/20 -z-10 hidden md:block"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-10 -right-10 bg-accent p-8 hidden lg:block"
          >
            <span className="text-primary font-bold text-5xl font-serif">12+</span>
            <p className="text-primary/70 text-xs uppercase tracking-widest font-bold mt-2">Years of <br /> Experience</p>
          </motion.div>
        </div>

        {/* Text Side */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              Crafting Visual Legacies <br /> Since 2012
            </h2>
            <p className="text-secondary-dark text-lg mb-6 leading-relaxed">
              At Elite Studio, we believe that photography is more than just clicking a button. It's about capturing the soul of a moment, the whisper of an emotion, and the grandeur of a story.
            </p>
            <p className="text-muted-light mb-10 leading-relaxed">
              Our team of visionary creators specializes in cinematic storytelling, combining technical mastery with an artistic eye. Whether it's a luxury wedding, a high-fashion editorial, or a corporate legacy, we bring your vision to life with unparalleled elegance.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                'Artistic Visual Storytelling',
                'High-End Equipment',
                'Premium Color Grading',
                'Bespoke Client Experience'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary-dark font-medium">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>

            <button className="btn-premium">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
