import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$499',
    description: 'Perfect for small events and personal shoots.',
    features: ['2 Hours Coverage', '25 Edited Photos', 'Online Gallery', 'Personal Use License'],
    isPopular: false
  },
  {
    name: 'Standard',
    price: '$999',
    description: 'Our most popular choice for weddings and fashion.',
    features: ['6 Hours Coverage', '75 Edited Photos', 'Luxury Photo Album', 'High-Res Digital Files', '2 Professional Photographers'],
    isPopular: true
  },
  {
    name: 'Premium',
    price: '$1,999',
    description: 'The ultimate cinematic experience for your legacy.',
    features: ['Full Day Coverage', '150+ Edited Photos', 'Grand Leather Album', 'Drone Shots Included', 'Cinematic Highlight Video', 'Fast-Track Delivery'],
    isPopular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-primary-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-accent uppercase tracking-widest text-sm mb-4 block">Pricing Plans</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Investment in Memories</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-10 flex flex-col ${
                plan.isPopular ? 'bg-accent text-primary' : 'bg-primary border border-white/5 text-white'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-white text-primary text-[10px] font-bold uppercase px-4 py-1 tracking-widest">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-serif font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold font-serif">{plan.price}</span>
                <span className={`text-xs uppercase tracking-widest ${plan.isPopular ? 'text-primary/60' : 'text-muted'}`}>/ Session</span>
              </div>
              
              <p className={`mb-8 text-sm leading-relaxed ${plan.isPopular ? 'text-primary/80' : 'text-muted-light'}`}>
                {plan.description}
              </p>

              <div className={`h-[1px] w-full mb-8 ${plan.isPopular ? 'bg-primary/20' : 'bg-white/10'}`}></div>

              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check size={16} className={plan.isPopular ? 'text-white' : 'text-accent'} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 uppercase tracking-[0.2em] font-bold text-xs transition-all duration-500 ${
                plan.isPopular 
                ? 'bg-primary text-white hover:bg-white hover:text-black' 
                : 'bg-accent text-primary hover:bg-white hover:text-black'
              }`}>
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
