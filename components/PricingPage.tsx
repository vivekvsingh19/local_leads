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

  const getGradient = (planId: string) => {
    switch (planId) {
      case 'starter': return 'from-blue-500 to-cyan-500';
      case 'pro': return 'from-primary-500 to-orange-500';
      case 'business': return 'from-purple-500 to-pink-500';
      default: return 'from-slate-500 to-slate-600';
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
              className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${
                plan.popular
                  ? 'bg-white dark:bg-slate-800 border-2 border-primary-500 ring-4 ring-primary-500/10 shadow-2xl shadow-primary-500/20 md:-mt-4 md:mb-4 z-10'
                  : 'bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6 text-center">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                   `bg-gradient-to-br ${getGradient(plan.id)}`
                }`}>
                  <div className="text-white">
                    {getIcon(plan.id)}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 h-10">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 text-center pb-8 border-b border-slate-100 dark:border-slate-700/50">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    ${billingPeriod === 'monthly' ? plan.price : Math.round(plan.yearlyPrice / 12)}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    /mo
                  </span>
                </div>
                {billingPeriod === 'yearly' && plan.price > 0 && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                    Billed ${plan.yearlyPrice}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                       plan.popular ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      <IconCheck className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => onSelectPlan(plan.id)}
                disabled={currentPlan === plan.id}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 ${
                  currentPlan === plan.id
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                    : plan.popular
                    ? 'bg-gradient-to-r from-primary-600 to-orange-600 text-white hover:from-primary-500 hover:to-orange-500'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {currentPlan === plan.id ? 'Current Plan' : 'Subscribe Now'}
              </button>
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
