import React from 'react';
import { Instagram, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-serif font-bold tracking-tighter text-white">
                ELITE<span className="text-accent">STUDIO</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-light">
                Cinematic Excellence
              </span>
            </div>
            <p className="text-muted-light text-sm max-w-md leading-relaxed mb-8">
              Elite Studio is a premium photography and cinematography collective dedicated to capturing the art of life. We blend technical mastery with emotional storytelling to create timeless visual legacies for our global clientele.
            </p>
            <div className="flex items-center gap-6">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-secondary hover:text-accent transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Portfolio', 'Pricing', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-muted-light hover:text-accent transition-colors text-sm uppercase tracking-widest">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Newsletter</h4>
            <p className="text-muted-light text-xs mb-6 uppercase tracking-widest leading-relaxed">
              Subscribe to get latest updates and photography tips.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-primary-light border border-white/10 p-3 text-white text-xs tracking-widest focus:outline-none focus:border-accent w-full"
              />
              <button className="bg-accent text-primary px-4 py-2 hover:bg-white transition-colors">
                GO
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-muted-light text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} ELITE STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-muted-light hover:text-white text-[10px] uppercase tracking-[0.2em]">Privacy Policy</a>
            <a href="#" className="text-muted-light hover:text-white text-[10px] uppercase tracking-[0.2em]">Terms of Service</a>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 bg-primary-light border border-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-500"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
