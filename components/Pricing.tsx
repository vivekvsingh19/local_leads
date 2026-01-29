
import React, { useState } from 'react';
import { IconCheck, IconZap, IconActivity, IconCrown } from './Icons';
import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../lib/types';

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

  const getPlanStyles = (planId: string) => {
    switch (planId) {
      case 'starter':
        return {
          icon: IconZap,
          color: 'from-blue-500 to-cyan-500',
          borderColor: 'border-blue-200 dark:border-blue-500/30',
          bgColor: 'bg-blue-50 dark:bg-blue-500/5',
          users: 'For side hustles',
        };
      case 'pro':
        return {
          icon: IconActivity,
          color: 'from-primary-500 to-orange-500',
          borderColor: 'border-primary-200 dark:border-primary-500/30',
          bgColor: 'bg-primary-50 dark:bg-primary-500/5',
          users: 'For active freelancers',
        };
      case 'business':
        return {
          icon: IconCrown,
          color: 'from-purple-500 to-pink-500',
          borderColor: 'border-purple-200 dark:border-purple-500/30',
          bgColor: 'bg-purple-50 dark:bg-purple-500/5',
          users: 'For agencies',
        };
      default:
        return {
          icon: IconZap,
          color: 'from-slate-500 to-gray-500',
          borderColor: 'border-slate-200 dark:border-slate-500/30',
          bgColor: 'bg-slate-50 dark:bg-slate-500/5',
          users: '',
        };
    }
  };

  const plans = PRICING_PLANS.map(plan => {
    const styles = getPlanStyles(plan.id);
    return {
      ...plan,
      ...styles,
      desc: plan.description,
    };
  });

  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Simple pricing, <span className="text-primary-600 dark:text-primary-400">huge ROI</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Start small, scale fast. No surprises, just results.
          </p>

          {/* Toggle with improved styling */}
          <div className="inline-flex items-center p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-full">
             <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !isAnnual
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
             >
                Monthly
             </button>
             <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isAnnual
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
             >
                Yearly
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                  -17%
                </span>
             </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative group flex flex-col ${
                plan.popular ? 'md:-mt-8 md:mb-8 z-10' : ''
              }`}
            >
              <div className={`h-full relative rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden ${
                plan.popular
                  ? 'bg-white dark:bg-[#0B1121] border-primary-500/50 dark:border-primary-500/50 shadow-2xl shadow-primary-500/10'
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50'
              }`}>

                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 via-orange-500 to-pink-500" />
                )}

                <div className="p-8 sm:p-10 flex flex-col h-full">

                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl ${plan.bgColor} ${plan.color.replace('from-', 'text-').split(' ')[0]}`}>
                        <plan.icon className="w-6 h-6" />
                      </div>
                      {plan.popular && (
                        <span className="bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-primary-100 dark:border-primary-500/20">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{plan.users}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        ${isAnnual ? Math.round(plan.yearlyPrice / 12) : plan.price}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">/mo</span>
                    </div>
                    {isAnnual && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                        Billed ${plan.yearlyPrice} yearly
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-10 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs opacity-80">Includes:</p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <IconCheck className={`w-5 h-5 flex-shrink-0 ${
                            plan.popular ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500'
                          }`} />
                          <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transform hover:-translate-y-0.5'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ Cancel anytime • Money-back guarantee • Secure payment</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
