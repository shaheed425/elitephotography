import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Twitter, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Services', path: '#services' },
    { name: 'Portfolio', path: '#portfolio' },
    { name: 'Packages', path: '#pricing' },
    { name: 'Testimonials', path: '#testimonials' },
  ];

  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-700 w-full max-w-7xl px-6 md:px-12 mt-4 ${
          isScrolled ? 'top-0 px-4 md:px-6' : 'top-4'
        }`}
      >
        <div 
          className={`relative flex justify-between items-center px-8 py-5 transition-all duration-500 rounded-full border border-white/5 ${
            isScrolled ? 'bg-[#111111]/80 backdrop-blur-xl shadow-2xl py-4' : 'bg-transparent border-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="group relative z-[70]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-white group-hover:text-accent transition-colors">
                ELITE<span className="text-accent">STUDIO</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-[10px] uppercase tracking-[0.2em] text-secondary/80 hover:text-accent transition-all font-bold relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Action Icons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center gap-4 text-white/40 mr-4 border-r border-white/10 pr-6">
              <Instagram size={14} className="hover:text-accent cursor-pointer transition-colors" />
              <Facebook size={14} className="hover:text-accent cursor-pointer transition-colors" />
            </div>
            <a href="#booking" className="btn-premium py-2 px-6 rounded-full text-[10px]">
              Book Session
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden relative z-[70] p-2 transition-colors ${isMobileMenuOpen ? 'text-white' : 'text-accent'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Cinematic Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary z-[55] flex flex-col pt-32 px-12"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,#d4af37_0%,transparent_50%)]"></div>
            </div>

            <nav className="flex flex-col space-y-6 relative z-[56]">
              <p className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Navigation</p>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl md:text-5xl font-serif text-white hover:text-accent transition-all flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <div className="w-0 h-[1px] bg-accent transition-all duration-700 group-hover:w-20"></div>
                </motion.a>
              ))}

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-12 flex items-center gap-8 text-accent"
              >
                <Instagram size={20} />
                <Facebook size={20} />
                <Twitter size={20} />
                <Phone size={20} />
              </motion.div>
            </nav>

            <div className="absolute bottom-12 left-12 text-white/20">
              <p className="text-[10px] uppercase tracking-widest">&copy; 2026 Elite Studio Photography</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
