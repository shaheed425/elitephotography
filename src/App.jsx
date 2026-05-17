import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Preloader from './components/Common/Preloader';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const PortfolioItem = lazy(() => import('./pages/PortfolioItem'));
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Router>
        <div className={`flex flex-col min-h-screen transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="h-screen bg-primary flex items-center justify-center text-white font-serif">Loading Perfection...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services/:slug" element={<ServiceDetails />} />
                <Route path="/portfolio/:slug" element={<PortfolioItem />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
