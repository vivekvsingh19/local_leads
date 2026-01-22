
import React, { useState, useEffect } from 'react';
import { IconMenu, IconX, IconZap, IconSun, IconMoon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  session: Session | null;
  onLoginClick: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ session, onLoginClick, currentPage = 'home', onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const toggleTheme = () => {
  //   if (isDark) {
  //     document.documentElement.classList.remove('dark');
  //     localStorage.theme = 'light';
  //     setIsDark(false);
  //   } else {
  //     document.documentElement.classList.add('dark');
  //     localStorage.theme = 'dark';
  //     setIsDark(true);
  //   }
  // };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    onNavigate?.('home');
  };

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Features', page: 'home', href: '#features' },
    { name: 'How it Works', page: 'home', href: '#what-it-does' },
    { name: 'Pricing', page: 'pricing', href: '#pricing' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-white/70 dark:bg-[#0B1121]/70 backdrop-blur-xl backdrop-saturate-150 shadow-xl dark:shadow-black/20 border border-slate-200 dark:border-white/10'
            : 'bg-white/50 dark:bg-[#0B1121]/50 backdrop-blur-md border border-transparent dark:border-white/5'
        } rounded-full py-2 pl-2 pr-2 md:pl-5 md:pr-2 flex items-center gap-4 md:gap-8 max-w-4xl w-full justify-between`}
      >
        {/* Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500 blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-1.5 rounded-full relative">
              <IconZap className="w-4 h-4" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white hidden md:block">ClientMine</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => link.page === 'pricing' ? handleNavClick('pricing') : (currentPage === 'home' ? window.location.href = link.href : handleNavClick('home'))}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                (link.page === currentPage)
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {link.name}
            </button>
          ))}
          {session && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                currentPage === 'dashboard'
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Dashboard
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
           {/* Theme Toggle */}
           {/* <button
             onClick={toggleTheme}
             className="p-2.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
             aria-label="Toggle theme"
           > */}
             {/* {isDark ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
           </button> */}

           {/* CTA Button */}
          <div className="flex items-center gap-2">
            {session ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="hidden md:block text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-full transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="hidden md:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onLoginClick}
                  className="text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-full transition-colors"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 focus:outline-none hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="md:hidden absolute top-24 left-4 right-4 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl pointer-events-auto z-40"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 px-4 py-3 rounded-2xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
