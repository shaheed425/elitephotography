import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/Common/SEO';
import { servicesAPI } from '../services/api';

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await servicesAPI.getBySlug(slug);
        setService(res.data.data);
      } catch (err) {
        setError('Service not found');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) return <div className="py-40 text-center bg-primary text-white font-serif">Loading Excellence...</div>;
  if (error || !service) return <div className="py-40 text-center bg-primary text-white font-serif">Service Not Found</div>;

  return (
    <div className="bg-primary min-h-screen pt-24 pb-20">
      <SEO
        title={`${service.title} | Photography & Videography Services`}
        description={service.description}
        image={service.imageUrl}
        url={`/services/${service.slug}`}
        type="product"
        keywords={`${service.title}, professional photography, elite studio services, ${service.category}`}
      />

      <div className="max-w-7xl mx-auto px-2">
        <Link to="/" className="text-accent text-sm uppercase tracking-widest mb-10 mt-10 inline-block hover:opacity-70 font-bold">
          ← Back to Studio
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/5">
            <img
              src={service.imageUrl || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070'}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="sticky top-32">
            <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
              {service.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              {service.title}
            </h1>
            <div className="w-20 h-1 bg-accent mb-10"></div>
            <p className="text-secondary-dark text-lg leading-relaxed mb-12 whitespace-pre-wrap font-serif italic">
              {service.description}
            </p>

            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-[0.2em]">Inquire About This Service</h4>
                <p className="text-muted-light text-sm mb-6">Contact our elite team to discuss your project requirements and receive a custom quote.</p>
                <Link to="/#contact" className="btn-premium block text-center py-4 rounded-full font-bold uppercase tracking-widest text-[10px] bg-accent text-primary hover:bg-white transition-colors duration-300">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
