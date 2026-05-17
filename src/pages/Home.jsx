import React from 'react';
import SEO from '../components/Common/SEO';
import Hero from '../sections/Home/Hero';
import About from '../sections/Home/About';
import Services from '../sections/Home/Services';
import Portfolio from '../sections/Home/Portfolio';
import Pricing from '../sections/Home/Pricing';
import Testimonials from '../sections/Home/Testimonials';
import Booking from '../sections/Home/Booking';
import Contact from '../sections/Home/Contact';

const Home = () => {
  return (
    <>
      <SEO 
        title="Premium Photography & Videography Studio in Kerala"
        description="Elite Studio offers professional photography and videography services for weddings, cinematic shoots, events, and portraits in Kerala and Calicut."
        keywords="wedding photography Kerala, cinematic wedding shoot, photography studio Calicut, best photographers in Kozhikode, professional videography services"
        url="/"
      />

      <div className="overflow-hidden">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Booking />
        <Contact />
      </div>
    </>
  );
};

export default Home;