import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { bookingsAPI } from '../../services/api';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    serviceType: 'Wedding Photography',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      await bookingsAPI.create(formData);
      setStatus({ type: 'success', message: 'Thank you! Your booking inquiry has been sent.' });
      setFormData({ name: '', email: '', phone: '', date: '', location: '', serviceType: 'Wedding Photography', message: '' });
    } catch (error) {
      console.error('Booking Error:', error);
      setStatus({ type: 'error', message: error.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="section-padding bg-primary-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Info Side */}
          <div className="w-full lg:w-1/3">
            <span className="text-accent uppercase tracking-widest text-sm mb-4 block">Book a Shoot</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Let's Create Something <span className="italic text-accent">Beautiful</span></h2>
            <p className="text-secondary-dark mb-8 leading-relaxed">
              Ready to capture your story? Fill out the form and our team will get back to you within 24 hours to discuss your vision.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-accent text-xs uppercase tracking-widest mb-1">Direct Line</p>
                <p className="text-white text-xl font-serif">+1 (555) 000-STUDIO</p>
              </div>
              <div>
                <p className="text-accent text-xs uppercase tracking-widest mb-1">Email Inquiry</p>
                <p className="text-white text-xl font-serif">hello@elitestudio.com</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-2/3">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Full Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="bg-primary border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="bg-primary border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Phone Number</label>
                <input 
                  type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                  className="bg-primary border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Preferred Date</label>
                <input 
                  type="date" name="date" value={formData.date} onChange={handleChange} required
                  className="bg-primary border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Event Location</label>
                <input 
                  type="text" name="location" value={formData.location} onChange={handleChange} required
                  className="bg-primary border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="e.g. Malappuram, Kerala"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Service Type</label>
                <select 
                  name="serviceType" value={formData.serviceType} onChange={handleChange}
                  className="bg-primary border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option>Wedding Photography</option>
                  <option>Portrait Session</option>
                  <option>Fashion & Editorial</option>
                  <option>Event Coverage</option>
                  <option>Commercial & Product</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Your Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} rows="4"
                  className="bg-primary border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button 
                  type="submit" disabled={loading}
                  className="btn-premium w-full flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

              {status.message && (
                <div className={`md:col-span-2 p-4 text-center text-sm uppercase tracking-widest font-bold ${
                  status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {status.message}
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
