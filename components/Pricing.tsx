
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
    <section id="pricing" className="py-32 bg-gradient-to-b from-slate-50 to-white dark:from-[#030712] dark:to-[#0f172a] relative transition-colors duration-300 overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary-500/10 via-purple-500/5 to-pink-500/10 dark:from-primary-500/20 dark:via-purple-500/10 dark:to-pink-500/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Simple pricing, <br/><span className="bg-gradient-to-r from-primary-500 to-orange-500 bg-clip-text text-transparent">huge ROI.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl mb-12 leading-relaxed">
            One new client pays for the entire year. Start small, scale fast. No surprises, just results.
          </p>

          {/* Toggle with improved styling */}
          <div className="inline-flex items-center gap-1 p-2 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full backdrop-blur-md shadow-lg">
             <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  !isAnnual
                    ? 'bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
             >
                Monthly
             </button>
             <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isAnnual
                    ? 'bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
             >
                Yearly
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isAnnual
                    ? 'bg-emerald-400/20 text-emerald-600'
                    : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                }`}>
                  Save 17%
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
              className={`relative group rounded-3xl transition-all duration-500 ${
                plan.popular
                  ? 'md:scale-105 md:z-10'
                  : ''
              }`}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
                plan.popular
                  ? 'bg-gradient-to-r from-primary-500 via-orange-500 to-pink-500'
                  : 'bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500'
              }`}></div>

              {/* Card */}
              <div className={`relative h-full rounded-3xl border-2 backdrop-blur-sm transition-all duration-300 flex flex-col ${
                plan.popular
                  ? `${plan.borderColor} bg-gradient-to-br from-white dark:from-slate-800 to-slate-50 dark:to-slate-900 shadow-2xl`
                  : `${plan.borderColor} bg-white dark:bg-slate-800/40 hover:shadow-xl`
              }`}>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.3 }}
                      className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wider"
                    >
                      ⭐ Most Popular
                    </motion.div>
                  </div>
                )}

                {/* Top accent line */}
                {plan.popular && (
                  <div className={`h-1 w-full rounded-t-3xl bg-gradient-to-r ${plan.color}`}></div>
                )}

                {/* Content */}
                <div className="p-8 flex flex-col h-full">

                  {/* Icon and Header */}
                  <div className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <plan.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{plan.users}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold text-slate-900 dark:text-white">${isAnnual ? Math.round(plan.yearlyPrice / 12) : plan.price}</span>
                      <span className="text-slate-600 dark:text-slate-400 text-lg font-semibold">/mo</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        Billed <span className="font-semibold text-slate-900 dark:text-white">${plan.yearlyPrice}</span>/year
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">{plan.desc}</p>

                  {/* Features */}
                  <div className="mb-8 flex-1">
                    <div className="space-y-3.5">
                      {plan.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            plan.popular
                              ? 'bg-gradient-to-br from-primary-500 to-orange-500'
                              : 'bg-gradient-to-br from-slate-400 to-slate-500'
                          }`}>
                            <IconCheck className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-snug">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary-600 to-orange-600 text-white hover:from-primary-500 hover:to-orange-500'
                        : 'bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 text-slate-900 dark:text-white hover:from-slate-200 hover:to-slate-100 dark:hover:from-slate-600 dark:hover:to-slate-700 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    Start 14-Day Free Trial
                  </motion.button>
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
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ No credit card required • Cancel anytime • Money-back guarantee</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
