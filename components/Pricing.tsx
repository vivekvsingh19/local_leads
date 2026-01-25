
import React, { useState } from 'react';
import { IconCheck } from './Icons';

interface PricingProps {
  onSelectPlan?: (planId: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

  return (
    <section id="pricing" className="py-32 bg-slate-50 dark:bg-[#030712] relative transition-colors duration-300 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary-500/5 dark:bg-primary-500/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Simple pricing, <br/><span className="text-primary-500">huge ROI.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
            One new client pays for the entire year. Choose the plan that fits your scale.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full backdrop-blur-md shadow-sm">
             <button
                onClick={() => setIsAnnual(false)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${!isAnnual ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
             >
                Monthly
             </button>
             <button
                onClick={() => setIsAnnual(true)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
             >
                Yearly
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${isAnnual ? 'bg-primary-500 text-white' : 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'}`}>-20%</span>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Starter Plan */}
          <div className="p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm flex flex-col hover:border-slate-300 dark:hover:bg-white/[0.04] transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs mb-4">Starter</h3>
              <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">${isAnnual ? '14' : '14'}</span>
                 <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed">Perfect for freelancers just getting started.</p>
            </div>
            <div className="h-px w-full bg-slate-200 dark:bg-white/5 mb-8"></div>
            <ul className="space-y-4 mb-8 flex-1">
              {['300 searches/month', 'Export up to 50 leads', 'Save 1,000 leads', 'Email templates', 'Email Support'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm font-medium">
                  <IconCheck className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan('starter')}
              className="w-full py-4 px-6 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-b from-slate-900 to-black dark:from-[#1e293b] dark:to-[#0f172a] text-white flex flex-col shadow-2xl shadow-primary-900/20 ring-1 ring-white/10 md:-mt-8 md:mb-8 z-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-orange-500"></div>
            <div className="mb-6 relative">
              <div className="inline-block px-3 py-1 rounded-full bg-primary-500 text-white text-[10px] font-bold mb-4 tracking-wider uppercase shadow-lg shadow-primary-500/40">Most Popular</div>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Professional</h3>
              <div className="flex items-baseline gap-1">
                 <span className="text-6xl font-extrabold text-white tracking-tight">${isAnnual ? '39' : '39'}</span>
                 <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">For growing freelancers and small agencies.</p>
            </div>
            <div className="h-px w-full bg-white/10 mb-8"></div>
            <ul className="space-y-4 mb-10 flex-1 relative">
              {['1,500 searches/month', 'Unlimited exports', 'Unlimited saved leads', 'Priority Support', 'API Access', 'Advanced analytics', '5 team members'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/40">
                     <IconCheck className="w-3 h-3 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan('pro')}
              className="relative w-full py-5 px-6 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/30 text-lg"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Business Plan */}
          <div className="p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm flex flex-col hover:border-slate-300 dark:hover:bg-white/[0.04] transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs mb-4">Business</h3>
              <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">${isAnnual ? '99' : '99'}</span>
                 <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed">For agencies and scaling teams that need unlimited access.</p>
            </div>
            <div className="h-px w-full bg-slate-200 dark:bg-white/5 mb-8"></div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited searches', 'Unlimited exports', 'Unlimited everything', 'Dedicated Support', 'Full API Access', 'White-label reports', 'Unlimited team members'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm font-medium">
                  <IconCheck className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan('business')}
              className="w-full py-4 px-6 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              Start 14-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
