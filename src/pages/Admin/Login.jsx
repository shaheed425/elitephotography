import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { authAPI } from '../../services/api';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.login(formData);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Cinematic Visuals */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-primary"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent to-[#050505]"></div>
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px] opacity-40"
          alt="Studio"
        />
        
        <div className="relative z-20 p-20 flex flex-col justify-between h-full w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-accent"></div>
            <span className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold">Secure Gateway</span>
          </div>

          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-7xl font-serif text-white leading-tight mb-8"
            >
              Excellence <br /> 
              <span className="italic text-accent">Starts Here.</span>
            </motion.h1>
            <p className="text-muted-light max-w-md text-sm leading-relaxed tracking-wide">
              Welcome to the Elite Studio Management Portal. Access your cinematic assets, manage bookings, and curate your digital gallery.
            </p>
          </div>

          <div className="text-[10px] uppercase tracking-widest text-white/20">
            &copy; 2026 Elite Studio &bull; Photography CMS v2.0
          </div>
        </div>
      </motion.div>

      {/* Right Side: Modern Login Form */}
      <div className="flex-grow flex items-center justify-center p-8 md:p-20 relative">
        {/* Background Decorative Element (Mobile Only) */}
        <div className="lg:hidden absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8">
              <ShieldCheck className="text-accent" size={32} />
            </div>
            <h2 className="text-4xl font-serif text-white mb-2">Login to <span className="text-accent">Admin</span></h2>
            <p className="text-muted-light text-[10px] uppercase tracking-[0.3em] font-bold">Enter your authorized credentials</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest font-bold p-4 mb-8 rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted-light font-bold">Authorized Identity</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-5 pl-14 text-white focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                  placeholder="USERNAME"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted-light font-bold">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-5 pl-14 pr-14 text-white focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                  placeholder="PASSWORD"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-accent hover:bg-white text-primary font-bold uppercase tracking-[0.3em] py-5 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Authenticate</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-muted-light text-[10px] uppercase tracking-widest">
              Forgotten your key? <span className="text-accent cursor-pointer hover:underline">Contact System Admin</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
