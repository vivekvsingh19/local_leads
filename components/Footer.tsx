
import React from 'react';
import { IconZap, IconTwitter, IconGithub } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="pt-12 pb-8 border-t border-slate-200 dark:border-white/5 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-[#020617]/50 -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary-600 to-primary-500 text-white p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <IconZap className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">ClientMine</span>
          </a>
          
          <p className="text-slate-600 dark:text-slate-500 text-sm max-w-md">
            The simplest tool for web designers and agencies to find local clients who actually need their help.
          </p>

          <div className="pt-6 border-t border-slate-200 dark:border-white/5 w-full space-y-4">
            <p className="text-sm text-slate-500 dark:text-slate-600">
              Crafted by <span className="font-semibold text-slate-700 dark:text-slate-400">7xstacc</span>
            </p>
            
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Contact Developer:</span>
              <a
                href="https://x.com/vivek_uncovered"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Developer on X"
                className="w-8 h-8 bg-slate-200 dark:bg-white/5 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer border border-transparent dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400"
              >
                <IconTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/vivekvsingh19"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Developer on GitHub"
                className="w-8 h-8 bg-slate-200 dark:bg-white/5 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer border border-transparent dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400"
              >
                <IconGithub className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
