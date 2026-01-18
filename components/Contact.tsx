
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-8 md:p-16 text-center overflow-hidden relative border border-white/10 shadow-2xl">
          
          {/* Decorative gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/10 to-transparent opacity-50 pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/20 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Find your first lead today.
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Give it a spin. The first 50 leads are on us. You don't even need to put in a credit card to try it.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-full bg-white/5 text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
              <button 
                type="button"
                className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Get Started
              </button>
            </form>
            <p className="mt-6 text-slate-500 text-sm">
              We don't spam. We just help you find work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
