import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatItDoes from './components/WhatItDoes';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PricingPage from './components/PricingPage';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './lib/auth';
import { SubscriptionTier } from './lib/types';

type Page = 'home' | 'dashboard' | 'pricing';

const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { session, profile, loading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Get subscription tier from profile, default to 'starter' for logged in users
  const subscriptionTier: SubscriptionTier = profile?.subscription_tier || (session ? 'starter' : 'starter');

  // Close login modal when user logs in
  useEffect(() => {
    if (session) {
      setIsLoginOpen(false);
    }
  }, [session]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleSelectPlan = (planId: string) => {
    console.log('Selected plan:', planId);

    // If user is not logged in, prompt login first
    if (!session) {
      setIsLoginOpen(true);
      return;
    }

    // TODO: Integrate with Stripe for payment
    if (planId === 'starter') {
      // Free tier, already available
      alert('You are on the Starter plan!');
    } else {
      alert(`Plan selected: ${planId}. Stripe integration coming soon!`);
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] bg-grid-black dark:bg-grid-white text-slate-900 dark:text-slate-200 overflow-x-hidden transition-colors duration-300 relative">
      {/* Noise Texture Overlay */}
      <div className="bg-noise"></div>

      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
      </div>

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
              subscriptionTier={subscriptionTier}
            />
            <WhatItDoes />
            <Features />
            <Pricing onSelectPlan={handleSelectPlan} />
            <Testimonials />
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
            <PricingPage onSelectPlan={handleSelectPlan} currentPlan={subscriptionTier} />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
