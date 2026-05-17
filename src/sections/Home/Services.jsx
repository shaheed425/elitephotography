import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Heart, User, Briefcase, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { servicesAPI } from '../../services/api';

const iconMap = {
  Heart, User, Camera, Video, ShoppingBag, Briefcase
};

const mockServices = [
  {
    name: 'Wedding Photography',
    description: 'Capturing your eternal love story in a cinematic, timeless style.',
    icon: 'Heart',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop'
  },
  {
    name: 'Portrait Sessions',
    description: 'Professional portraits that highlight your unique personality and character.',
    icon: 'User',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
  }
];

const Services = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await servicesAPI.getActive();
        if (res.data.data.length > 0) {
          setItems(res.data.data);
        } else {
          setItems(mockServices);
        }
      } catch (err) {
        console.log('Using mock services');
        setItems(mockServices);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center bg-primary-light">
        <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section id="services" className="section-padding bg-primary-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block"
          >
            Studio Specialties
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tighter"
          >
            Professional <span className="italic text-accent">Services</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((service, index) => {
            const Icon = iconMap[service.icon] || Camera;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="group relative overflow-hidden h-[500px] rounded-3xl border border-white/5 cursor-pointer"
              >
                {/* Background Image with Hover Zoom */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 ${!service.imageUrl ? 'bg-gradient-to-br from-[#1a1a1a] to-[#050505]' : ''}`}
                  style={service.imageUrl ? { backgroundImage: `url(${service.imageUrl})` } : {}}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-10 z-10">
                  <div className="mb-6 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 backdrop-blur-md">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <p className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{service.category || 'Expertise'}</p>
                    <h3 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">{service.title}</h3>
                    <p className="text-muted-light text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                    <span 
                      className="text-white text-[10px] uppercase tracking-widest font-bold border-b border-accent pb-1 hover:text-accent transition-colors cursor-pointer"
                    >
                      Explore Details
                    </span>
                    <div className="flex-grow h-[1px] bg-white/10"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
