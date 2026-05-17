import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Link } from 'react-router-dom';
import { galleryAPI } from '../../services/api';

const categories = ['All', 'Wedding', 'Portrait', 'Couple', 'Event', 'Product', 'Fashion'];

const mockPortfolio = [
  { _id: 1, category: 'Wedding', title: 'Grace & Thomas', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' },
  { _id: 2, category: 'Portrait', title: 'Studio Session 01', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
  { _id: 3, category: 'Wedding', title: 'Elegance in Bloom', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop' },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState(mockPortfolio);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await galleryAPI.getAll();
        if (res.data.data.length > 0) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.log('Using mock data');
      }
    };
    loadItems();
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const slides = filteredItems.map(item => ({ src: item.imageUrl }));

  return (
    <section id="portfolio" className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-accent uppercase tracking-widest text-sm mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Our Masterpieces</h2>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-widest font-bold transition-all duration-300 relative pb-2 ${
                  activeCategory === cat ? 'text-accent' : 'text-muted-light hover:text-white'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, i) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative cursor-pointer aspect-[3/4] overflow-hidden"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-accent text-xs uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-serif text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 mb-4">
                    {item.title}
                  </h3>
                  <Link 
                    to={`/portfolio/${item.slug}`} 
                    className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Story →
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </section>
  );
};

export default Portfolio;
