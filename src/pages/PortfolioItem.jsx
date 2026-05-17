import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/Common/SEO';
import { galleryAPI } from '../services/api';

const PortfolioItem = () => {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await galleryAPI.getBySlug(slug);
        setItem(res.data.data);
      } catch (err) {
        setError('Portfolio item not found');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [slug]);

  if (loading) return <div className="py-40 text-center bg-primary text-white font-serif italic">Loading Masterpiece...</div>;
  if (error || !item) return <div className="py-40 text-center bg-primary text-white font-serif">Portfolio Item Not Found</div>;

  return (
    <div className="bg-primary min-h-screen pt-24 pb-20">
      <SEO 
        title={`${item.title} | ${item.category} Photography Portfolio`}
        description={`View ${item.title}, a stunning piece of ${item.category} photography by Elite Studio. Explore our professional portfolio for more cinematic works.`}
        image={item.imageUrl}
        url={`/portfolio/${item.slug}`}
        type="article"
        keywords={`${item.title}, ${item.category} photography, elite studio portfolio, cinematic photography Kerala`}
      />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="text-accent text-sm uppercase tracking-widest hover:opacity-70 font-bold transition-all">
            ← Back to Gallery
          </Link>
          <span className="text-white/40 uppercase tracking-[0.3em] text-[10px]">{item.category}</span>
        </div>
        
        <div className="space-y-12">
          <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              {item.title}
            </h1>
            <div className="w-16 h-1 bg-accent mb-8"></div>
            <p className="text-secondary-dark text-lg leading-relaxed font-serif italic">
              Experience the art of storytelling through our lens. This {item.category.toLowerCase()} session captures the essence of the moment with our signature cinematic style.
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-24 p-12 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Love this style?</h2>
          <p className="text-muted-light mb-10 max-w-xl mx-auto italic text-lg">Let's create something extraordinary together. Book your session today.</p>
          <Link to="/#booking" className="btn-premium inline-block px-12 py-5 rounded-full bg-accent text-primary font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300">
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
