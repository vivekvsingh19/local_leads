
import React from 'react';
import { IconZap, IconTwitter, IconGithub } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-[#020617] pt-20 pb-10 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6 group">
              <div className="bg-gradient-to-br from-primary-600 to-primary-500 text-white p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                <IconZap className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">LocalLeads</span>
            </a>
            <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              The simplest tool for web designers and agencies to find local clients who actually need their help.
            </p>
            <div className="flex gap-4">
               {/* Developer Links */}
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
            <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">Contact Developer</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#what-it-does" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">How it works</a></li>
              <li><a href="#pricing" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Affiliates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="https://example.com/blog" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="https://example.com/templates" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cold Email Templates</a></li>
              <li><a href="https://example.com/scripts" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Sales Scripts</a></li>
              <li><a href="https://example.com/support" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Support Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Data Usage</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 dark:border-white/5 text-sm text-slate-500 dark:text-slate-600">
          <p>&copy; {new Date().getFullYear()} LocalLeads Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ in Austin, Texas.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
