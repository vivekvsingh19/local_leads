
import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-[#020617] relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              People are actually <br /> getting clients.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md">
              We asked a few of our early users how this changed their daily workflow. Here is what they said.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative">
                    <img 
                      src={`https://picsum.photos/100/100?random=${i + 15}`} 
                      alt="User" 
                      className="w-12 h-12 rounded-full border-2 border-white dark:border-[#020617]"
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-black/5 dark:ring-white/10"></div>
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                Used by 2,000+ freelancers
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-xl dark:shadow-black/20 ring-1 ring-slate-200 dark:ring-white/10 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-500/10 dark:bg-primary-500/10 rounded-full blur-2xl"></div>
            <blockquote className="relative z-10">
              <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-6 font-light">
                "Honestly, I used to spend my Sunday afternoons scrolling through Maps looking for pizza places or mechanics that didn't have websites. It was mind-numbing. This tool just does that list for me in 5 minutes. I sent 10 emails yesterday and got 2 replies."
              </p>
              <footer className="flex items-center gap-4 border-t border-slate-200 dark:border-white/5 pt-6">
                <img 
                  src="https://picsum.photos/100/100?random=5" 
                  alt="Mike Ross" 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200 dark:ring-white/10"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Mike Ross</div>
                  <div className="text-slate-500 text-sm">Web Designer</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
