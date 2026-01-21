
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatItDoes from './components/WhatItDoes';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Resources from './components/Resources';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PricingPage from './components/PricingPage';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

type Page = 'home' | 'dashboard' | 'pricing';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [session, setSession] = useState<Session | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    // Only check session if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      console.log('🔓 Running without authentication (Supabase not configured)');
      return;
    }

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setIsLoginOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleSelectPlan = (planId: string) => {
    console.log('Selected plan:', planId);
    // TODO: Integrate with Stripe for payment
    if (planId === 'free') {
      setIsLoginOpen(true);
    } else {
      alert(`Stripe integration coming soon! Selected plan: ${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-200 overflow-x-hidden transition-colors duration-300 relative">
      {/* Noise Texture Overlay */}
      <div className="bg-noise"></div>

      {/* Login modal */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-orange-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar
        session={session}
        onLoginClick={() => setIsLoginOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero
              session={session}
              onLoginClick={() => setIsLoginOpen(true)}
            />
            <WhatItDoes />
            <Features />
            <Pricing onSelectPlan={handleSelectPlan} />
            <Testimonials />
            <Resources />
          </motion.main>
        )}

        {currentPage === 'dashboard' && (
          <motion.main
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard session={session} onNavigate={handleNavigate} />
          </motion.main>
        )}

        {currentPage === 'pricing' && (
          <motion.main
            key="pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PricingPage onSelectPlan={handleSelectPlan} currentPlan="free" />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default App;
