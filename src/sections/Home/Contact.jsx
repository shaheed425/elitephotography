import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    { icon: MapPin, title: 'Studio Address', detail: 'malappuram, kerala ' },
    { icon: Phone, title: 'Phone Number', detail: '+91 8590315711' },
    { icon: Mail, title: 'Email Address', detail: 'greekstudio@elitestudio.com' },
    { icon: Clock, title: 'Working Hours', detail: 'Mon - Sat: 09:00 AM - 07:00 PM' },
  ];

  return (
    <section id="contact" className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-primary-light border border-white/5 flex items-center justify-center mb-6 group-hover:border-accent/50 transition-all duration-500">
                <info.icon className="text-accent" size={24} />
              </div>
              <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">{info.title}</h4>
              <p className="text-muted-light text-sm leading-relaxed">{info.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
