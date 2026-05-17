import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsAPI } from '../../services/api';

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await testimonialsAPI.getAll();
        if (res.data.data.length > 0) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.log('Error loading testimonials');
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }, 3000); // Auto-scroll every 3 seconds
      
      return () => clearInterval(interval);
    }
  }, [items.length, activeIndex]);

  if (loading || items.length === 0) return null;

  const current = items[activeIndex];

  return (
    <section id="testimonials" className="section-padding bg-primary relative overflow-hidden min-h-[600px] flex items-center">
      {/* Abstract Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block"
          >
            Client Experience
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white"
          >
            What Our Clients <span className="italic text-accent">Say</span>
          </motion.h2>
        </div>

        {/* Testimonial Content Display */}
        <div className="relative mb-20 min-h-[250px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto"
            >
              <Quote className="text-accent/20 mx-auto mb-8" size={48} />
              
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={`${i < current.rating ? 'fill-accent text-accent' : 'text-white/10'}`} 
                  />
                ))}
              </div>

              <p className="text-white/90 text-xl md:text-2xl font-serif italic leading-relaxed mb-8 px-4">
                "{current.comment}"
              </p>

              <div>
                <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-1">{current.clientName}</h4>
                <p className="text-accent text-[10px] uppercase tracking-[0.2em]">{current.clientTitle || 'Happy Client'}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Avatar Selection Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {items.map((item, index) => (
            <motion.button
              key={item._id}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative group focus:outline-none"
            >
              {/* Active Ring */}
              {activeIndex === index && (
                <motion.div 
                  layoutId="activeAvatar"
                  className="absolute -inset-3 border border-accent/30 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Avatar Image */}
              <div className={`
                relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-all duration-500
                ${activeIndex === index ? 'scale-110 grayscale-0 ring-2 ring-accent' : 'grayscale opacity-40 hover:opacity-100 hover:grayscale-0 scale-100'}
              `}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.clientName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary-light flex items-center justify-center text-accent text-xl font-serif">
                    {item.clientName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Hover Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{item.clientName}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Navigation Arrows (Optional for accessibility) */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between pointer-events-none px-4 hidden md:flex">
          <button 
            onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all pointer-events-auto"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all pointer-events-auto"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
