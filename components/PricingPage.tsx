import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconShield, IconZap, IconActivity, IconArrowRight, IconCrown, IconCheck } from './Icons';
import { PRICING_PLANS, PricingPlan } from '../lib/types';

interface PricingPageProps {
  onSelectPlan: (planId: string) => void;
  currentPlan?: string;
}

const PricingPage: React.FC<PricingPageProps> = ({ onSelectPlan, currentPlan = 'starter' }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'starter': return <IconZap className="w-6 h-6" />;
      case 'pro': return <IconActivity className="w-6 h-6" />;
      case 'business': return <IconCrown className="w-6 h-6" />;
      default: return <IconShield className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Pay only for what you use. Start small, scale as you grow. Choose the plan that fits your needs.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Usage Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-800/30 border border-blue-200 dark:border-slate-700/50 rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">How much will you use?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Starter - Side Hustle</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">~10 searches/week = 40/month. Exploring markets before committing.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Professional - Active Freelancer</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">~50 searches/week = 200/month. Finding 200-400 leads to pitch regularly.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Business - Scaling Agency</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Unlimited searches. Managing multiple campaigns & team members.</p>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col ${
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

                <div className="p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-8">
                     <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl ${
                          plan.id === 'pro' ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' :
                          plan.id === 'business' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                          'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {getIcon(plan.id)}
                        </div>
                        {plan.popular && (
                          <span className="bg-primary-5 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-primary-100 dark:border-primary-500/20">
                            Most Popular
                          </span>
                        )}
                     </div>

                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        ${billingPeriod === 'monthly' ? plan.price : Math.round(plan.yearlyPrice / 12)}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        /mo
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && plan.price > 0 && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                        Billed ${plan.yearlyPrice} yearly
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs opacity-80">Includes:</p>
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <IconCheck className={`w-5 h-5 flex-shrink-0 ${
                            plan.popular ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500'
                          }`} />
                        <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    disabled={currentPlan === plan.id}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      currentPlan === plan.id
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transform hover:-translate-y-0.5'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                    }`}
                  >
                    {currentPlan === plan.id ? 'Current Plan' : 'Subscribe Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period. No long-term contracts required.',
              },
              {
                q: 'How many leads will I get?',
                a: 'Most users get 2-5 qualified leads per search. Starter users (~12 searches) typically find 50-100 leads/month to contact.',
              },
              {
                q: 'Do you offer refunds?',
                a: "We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.',
              },
              {
                q: 'Which plan should I start with?',
                a: 'Start with Starter to test markets (~10 searches/week). Upgrade to Professional when doing 50+ searches/week or needing team features.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-br from-primary-500 to-orange-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to find more clients?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of freelancers and agencies who use this platform to find businesses that need their services.
            </p>
            <button
              onClick={() => onSelectPlan('starter')}
              className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
