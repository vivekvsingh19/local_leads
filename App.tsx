
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
import { motion, useScroll, useSpring } from 'framer-motion';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [session, setSession] = useState<Session | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-200 overflow-x-hidden transition-colors duration-300 relative">
      {/* Noise Texture Overlay */}
      <div className="bg-noise"></div>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-orange-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar
        session={session}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      <main>
        <Hero
          session={session}
          onLoginClick={() => setIsLoginOpen(true)}
        />
        <WhatItDoes />
        <Features />
        <Pricing />
        <Testimonials />
        <Resources />
      </main>

      <Footer />
    </div>
  );
};

export default App;
