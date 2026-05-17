import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Camera, 
  Package as PackageIcon, 
  MessageSquare, 
  CalendarCheck, 
  LogOut,
  Plus,
  Trash2,
  Settings,
  X,
  Menu,
  Loader2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryAPI, servicesAPI, packagesAPI, testimonialsAPI, bookingsAPI } from '../../services/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({
    images: 0,
    services: 0,
    bookings: 0,
    revenue: '$0'
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({});
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      switch (activeTab) {
        case 'Overview':
          // Fetch all for stats
          const [g, s, b] = await Promise.all([
            galleryAPI.getAll(),
            servicesAPI.getAll(),
            bookingsAPI.getAll()
          ]);
          setStats({
            images: g.data.data.length,
            services: s.data.data.length,
            bookings: b.data.data.length,
            revenue: `$${b.data.data.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)}`
          });
          setData([]);
          break;
        case 'Gallery': res = await galleryAPI.getAll(); break;
        case 'Services': res = await servicesAPI.getAll(); break;
        case 'Packages': res = await packagesAPI.getAll(); break;
        case 'Testimonials': res = await testimonialsAPI.getAll(); break;
        case 'Bookings': res = await bookingsAPI.getAll(); break;
        default: res = { data: [] };
      }
      if (res) setData(res.data.data || res.data);
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      switch (activeTab) {
        case 'Gallery': await galleryAPI.delete(id); break;
        case 'Services': await servicesAPI.delete(id); break;
        case 'Packages': await packagesAPI.delete(id); break;
        case 'Testimonials': await testimonialsAPI.delete(id); break;
        case 'Bookings': await bookingsAPI.delete(id); break;
      }
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        payload.append(key, formData[key]);
      });

      switch (activeTab) {
        case 'Gallery': await galleryAPI.create(payload); break;
        case 'Services': await servicesAPI.create(payload); break;
        case 'Testimonials': await testimonialsAPI.create(payload); break;
        case 'Packages': await packagesAPI.create(formData); break;
      }
      setIsModalOpen(false);
      setFormData({});
      fetchData();
    } catch (err) {
      console.error('Submit Error:', err);
      const msg = err.response?.data?.message || err.message || 'Submit failed';
      alert(`ERROR: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setFormData({});
    fetchData();
    setIsSidebarOpen(false); // Close sidebar on tab change (mobile)
  }, [activeTab]);

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Gallery', icon: ImageIcon },
    { name: 'Services', icon: Camera },
    { name: 'Packages', icon: PackageIcon },
    { name: 'Testimonials', icon: MessageSquare },
    { name: 'Bookings', icon: CalendarCheck },
  ];

  return (
    <div className="min-h-screen bg-primary flex flex-col md:flex-row relative">
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden flex items-center justify-between p-6 bg-primary-light border-b border-white/5 sticky top-0 z-[80]">
        <h3 className="text-white font-serif font-bold text-lg">ELITE STUDIO</h3>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-accent p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[85] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-[90] h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col pt-12 transition-transform duration-500
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="px-8 mb-12 hidden md:block">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-1">Management</p>
          <h3 className="text-white font-serif font-bold text-xl tracking-tighter">ELITE<span className="text-accent">STUDIO</span></h3>
        </div>

        <nav className="flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-8 py-4 transition-all duration-300 ${
                activeTab === item.name 
                ? 'bg-accent/5 text-accent border-r-2 border-accent' 
                : 'text-muted-light hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              <span className="text-xs uppercase tracking-widest font-bold">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 hidden md:block">
          <div className="bg-primary-light p-4 rounded-xl border border-white/5">
            <p className="text-[8px] uppercase tracking-widest text-muted-light mb-2">Logged in as</p>
            <p className="text-white text-xs font-bold truncate">Administrator</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Admin Top Navbar (Desktop) */}
        <header className="hidden md:flex h-20 items-center justify-between px-12 bg-primary/40 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[70]">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-xs text-muted-light uppercase tracking-widest font-medium">System Online</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <p className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Current Session</p>
              <p className="text-white text-xs font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-muted-light hover:text-red-500 transition-all bg-white/5 hover:bg-red-500/10 px-4 py-2 rounded-full border border-white/10"
            >
              <LogOut size={16} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-grow p-6 md:p-12 overflow-x-hidden pt-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">{activeTab}</h2>
          {activeTab !== 'Overview' && activeTab !== 'Bookings' && (
            <button onClick={() => setIsModalOpen(true)} className="btn-premium flex items-center justify-center gap-2 px-6 py-3 w-full md:w-auto text-xs">
              <Plus size={16} />
              Add {activeTab.slice(0, -1)}
            </button>
          )}
        </div>

        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { label: 'Total Images', value: stats.images, icon: ImageIcon },
              { label: 'Services', value: stats.services, icon: Camera },
              { label: 'Active Bookings', value: stats.bookings, icon: CalendarCheck },
              { label: 'Revenue', value: stats.revenue, icon: LayoutDashboard },
            ].map((stat, i) => (
              <motion.div key={i} className="bg-primary-light border border-white/5 p-8">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-light">{stat.label}</p>
                  <stat.icon className="text-accent/40" size={20} />
                </div>
                <p className="text-3xl font-serif text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dynamic Content Area */}
        <div className="min-h-[400px] relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/80 z-10">
              <Loader2 className="text-accent animate-spin" size={32} />
            </div>
          ) : activeTab === 'Bookings' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.length > 0 ? data.map((item) => (
                <motion.div 
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-light border border-white/5 p-6 relative group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-2 py-1 text-[8px] uppercase tracking-widest font-bold ${
                      item.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      {item.status}
                    </div>
                    <button onClick={() => handleDelete(item._id)} className="text-muted-light hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4 className="text-white font-serif font-bold text-lg mb-1">{item.name}</h4>
                  <p className="text-accent text-[10px] uppercase tracking-widest mb-4">{item.serviceType}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-muted-light text-xs">
                      <Clock size={12} className="text-accent" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-muted-light text-xs">
                      <Settings size={12} className="text-accent" />
                      {item.location}
                    </div>
                    <div className="text-muted-light text-xs mt-4 italic border-t border-white/5 pt-4">
                      "{item.message}"
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Contact</p>
                    <p className="text-white text-xs">{item.email}</p>
                    <p className="text-white text-xs">{item.phone}</p>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full py-20 text-center text-muted-light uppercase tracking-widest text-xs">No bookings found</div>
              )}
            </div>
          ) : (
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-muted-light font-bold">
                      <th className="py-6 px-8">Preview</th>
                      <th className="py-6 px-8">Identified As</th>
                      <th className="py-6 px-8">Category / Info</th>
                      <th className="py-6 px-8">Timestamp</th>
                      <th className="py-6 px-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    {data.length > 0 ? data.map((item) => (
                      <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-6 px-8">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 bg-primary-light">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Item" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-accent/20">
                                <ImageIcon size={20} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex flex-col">
                            <span className="text-white font-bold tracking-tight text-base mb-1">
                              {item.name || item.clientName || item.title || 'Untitled'}
                            </span>
                            <span className="text-accent text-[8px] uppercase tracking-widest font-bold">
                              {activeTab.slice(0, -1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-muted-light font-medium">
                          {item.category || item.clientTitle || item.serviceType || item.description?.substring(0, 30) + '...'}
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono">
                            <Clock size={10} />
                            {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <button 
                            onClick={() => handleDelete(item._id)} 
                            className="p-2 rounded-lg bg-red-500/0 hover:bg-red-500/10 text-muted-light hover:text-red-500 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="py-24 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                              <Plus size={24} />
                            </div>
                            <p className="text-muted-light uppercase tracking-[0.3em] text-[10px] font-bold">No Records Found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-primary border border-white/10 p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-muted-light hover:text-white"><X size={20} /></button>
              <h3 className="text-2xl font-serif text-white mb-8">Add New {activeTab.slice(0, -1)}</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {(activeTab === 'Gallery' || activeTab === 'Services' || activeTab === 'Testimonials') && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">
                      {activeTab === 'Testimonials' ? 'Client Profile Picture' : 'Image'}
                    </label>
                    <input 
                      type="file" 
                      name="image"
                      required 
                      onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
                      className="w-full bg-primary-light border border-white/10 p-4 text-white text-xs" 
                    />
                    {formData.image && (
                      <div className="mt-4 border border-white/10 p-2">
                        <img 
                          src={URL.createObjectURL(formData.image)} 
                          className="w-full h-32 object-cover" 
                          alt="Preview" 
                        />
                      </div>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">
                    {activeTab === 'Services' ? 'Service Title' : activeTab === 'Testimonials' ? 'Client Name' : 'Title / Name'}
                  </label>
                  <input 
                    type="text" 
                    name={activeTab === 'Testimonials' ? 'clientName' : (activeTab === 'Services' || activeTab === 'Gallery') ? 'title' : 'name'}
                    required 
                    onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                    className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent" 
                  />
                </div>

                {activeTab === 'Testimonials' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Client Title (Optional)</label>
                      <input 
                        type="text" 
                        name="clientTitle"
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                        className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent" 
                        placeholder="e.g. Happy Bride" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Rating (1-5)</label>
                      <input 
                        type="number" 
                        name="rating"
                        min="1" max="5" 
                        required 
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                        className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent" 
                      />
                    </div>
                  </>
                )}

                {activeTab === 'Services' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Icon</label>
                      <select 
                        name="icon"
                        required 
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                        className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent"
                      >
                        <option value="">Select Icon</option>
                        <option value="Heart">Heart (Wedding)</option>
                        <option value="User">User (Portrait)</option>
                        <option value="Camera">Camera (Fashion)</option>
                        <option value="Video">Video (Event)</option>
                        <option value="ShoppingBag">Shopping Bag (Product)</option>
                        <option value="Briefcase">Briefcase (Corporate)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Status</label>
                      <select 
                        name="isActive"
                        required 
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                        className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">
                    {activeTab === 'Gallery' || activeTab === 'Services' ? 'Category' : activeTab === 'Testimonials' ? 'Review Comment' : 'Category / Description'}
                  </label>
                  {activeTab === 'Gallery' || activeTab === 'Services' ? (
                    <select 
                      name="category"
                      required 
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                      className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent"
                    >
                      <option value="">Select Category</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Couple">Couple</option>
                      <option value="Event">Event</option>
                      <option value="Product">Product</option>
                      <option value="Fashion">Fashion</option>
                    </select>
                  ) : (
                    <textarea 
                      name={activeTab === 'Testimonials' ? 'comment' : 'description'}
                      rows="3" 
                      required 
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                      className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent resize-none" 
                    />
                  )}
                </div>

                {activeTab === 'Services' && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Service Description</label>
                    <textarea 
                      name="description"
                      rows="3" 
                      required 
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                      className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent resize-none" 
                    />
                  </div>
                )}

                {activeTab === 'Packages' && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-light font-bold">Price</label>
                    <input 
                      type="number" 
                      name="price"
                      required 
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                      className="w-full bg-primary-light border border-white/10 p-4 text-white focus:outline-none focus:border-accent" 
                    />
                  </div>
                )}

                <button type="submit" disabled={submitting} className="w-full btn-premium flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : 'Create Item'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
