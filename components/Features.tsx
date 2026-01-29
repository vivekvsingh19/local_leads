
import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconGlobe, IconFileDown, IconPhone, IconZap, IconArrowRight } from './Icons';

const Features: React.FC = () => {
   return (
      <section id="features" className="py-24 relative overflow-hidden">
         {/* Background Glows */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
         </div>

         <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-24">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-wider mb-6 border border-primary-100 dark:border-primary-500/20"
               >
                  <IconZap className="w-3.5 h-3.5" />
                  <span>The Engine</span>
               </motion.div>

               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
               >
                  Complete dominance.<br />
                  <span className="text-slate-400 dark:text-slate-600">Zero complexity.</span>
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
               >
                  We built a lead generation engine that mimics human behavior at scale. It finds what others miss and verifies what others guess.
               </motion.p>
            </div>

            {/* Feature 1: The Radar */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32 group">
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="order-2 lg:order-1"
               >
                  <div className="flex items-center gap-4 mb-6">
                     <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <IconMapPin className="w-6 h-6" />
                     </span>
                     <span className="text-5xl font-bold text-slate-200 dark:text-slate-800 select-none">01</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Hyper-Local Radar</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                     Most scrapers only look at control centers. Our engine walks the streets virtually. It drills down to specific neighborhoods and zip codes to find businesses that aren't listing properly.
                  </p>
                  <ul className="space-y-3">
                     {['Precise Zip Code Targeting', 'Hidden Listing Detection', 'Google Maps Deep-Scan'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                           {item}
                        </li>
                     ))}
                  </ul>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="order-1 lg:order-2 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0B1121] dark:to-[#020617] rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-2"
               >
                  <div className="relative aspect-square w-full max-w-md mx-auto bg-white dark:bg-[#030712] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-white/5 flex items-center justify-center">
                     {/* Modern Radar UI */}
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                     {/* Scale markings */}
                     <div className="absolute w-[80%] h-[80%] border border-dashed border-slate-300 dark:border-white/10 rounded-full"></div>
                     <div className="absolute w-[50%] h-[50%] border border-slate-200 dark:border-white/5 rounded-full"></div>

                     {/* Sweep Animation */}
                     <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full"
                     >
                        <div className="absolute top-1/2 left-1/2 w-[45%] h-[2px] bg-gradient-to-r from-blue-500 to-transparent origin-left -translate-y-1/2"></div>
                     </motion.div>

                     {/* Center */}
                     <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 z-10 relative">
                        <div className="absolute inset-0 animate-ping bg-blue-500 rounded-full opacity-75"></div>
                     </div>

                     {/* Blips */}
                     {[
                        { top: '30%', left: '60%', delay: 0, color: 'bg-orange-500' },
                        { top: '70%', left: '40%', delay: 1, color: 'bg-emerald-500' },
                        { top: '40%', left: '25%', delay: 2, color: 'bg-indigo-500' },
                     ].map((blip, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, scale: 0 }}
                           animate={{ opacity: [0, 1, 0] }}
                           transition={{ duration: 3, delay: blip.delay, repeat: Infinity }}
                           className={`absolute w-3 h-3 ${blip.color} rounded-full shadow-lg z-10`}
                           style={{ top: blip.top, left: blip.left }}
                        />
                     ))}
                  </div>
               </motion.div>
            </div>

            {/* Feature 2: Terminal */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-[#0F1117] rounded-[2rem] border border-[#1F2937] p-8 md:p-12 shadow-2xl relative overflow-hidden"
               >
                  {/* Traffic Lights */}
                  <div className="flex gap-2 mb-6">
                     <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                  </div>
                  {/* Code Content */}
                  <div className="font-mono text-sm md:text-base space-y-4">
                     <div className="flex gap-4">
                        <span className="text-slate-500">1</span>
                        <span className="text-purple-400">async function</span> <span className="text-blue-400">verifyLead</span><span className="text-slate-300">(url)</span> <span className="text-slate-500">{'{'}</span>
                     </div>
                     <div className="flex gap-4">
                        <span className="text-slate-500">2</span>
                        <span className="text-slate-500 pl-4">// Real-time connection check</span>
                     </div>
                     <div className="flex gap-4">
                        <span className="text-slate-500">3</span>
                        <span className="text-purple-400 pl-4">const</span> <span className="text-slate-300">status</span> <span className="text-purple-400">=</span> <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span><span className="text-slate-300">(url);</span>
                     </div>
                     <div className="flex gap-4">
                        <span className="text-slate-500">4</span>
                        <div className="pl-4">
                           <span className="text-purple-400">if</span> <span className="text-slate-300">(status === </span><span className="text-orange-400">404</span><span className="text-slate-300">)</span> <span className="text-slate-500">{'{'}</span>
                        </div>
                     </div>
                     <div className="flex gap-4 bg-green-500/10 -mx-4 px-4 py-1 border-l-2 border-green-500">
                        <span className="text-slate-500">5</span>
                        <span className="text-green-400 pl-8">return "HOT_LEAD";</span>
                     </div>
                     <div className="flex gap-4">
                        <span className="text-slate-500">6</span>
                        <span className="text-slate-500 pl-4">{'}'}</span>
                     </div>
                     <div className="flex gap-4">
                        <span className="text-slate-500">7</span>
                        <span className="text-slate-500">{'}'}</span>
                     </div>
                  </div>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
               >
                  <div className="flex items-center gap-4 mb-6">
                     <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <IconGlobe className="w-6 h-6" />
                     </span>
                     <span className="text-5xl font-bold text-slate-200 dark:text-slate-800 select-none">02</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Live Verification</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                     Dead leads kill productivity. We ping every website in real-time. If a business has a broken website or a 404 error, we flag it immediately. These are your hottest prospects.
                  </p>
                  <ul className="space-y-3">
                     {['Automatic Signal Detection', 'No Stale Databases', 'Instant Validation'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                           {item}
                        </li>
                     ))}
                  </ul>
               </motion.div>
            </div>

            {/* Feature 3: Action */}
            <div className="bg-slate-50 dark:bg-[#0F1117] rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                   <div>
                      <div className="flex items-center gap-4 mb-6">
                         <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400">
                            <div className="flex gap-1">
                               <IconFileDown className="w-5 h-5" />
                            </div>
                         </span>
                         <span className="text-5xl font-bold text-slate-200 dark:text-slate-800 select-none">03</span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Export & Conquer</h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                         Get your data out instantly. We provide clean, formatted CSVs compatible with every major CRM. Plus, we scrape direct phone numbers so you can bypass the front desk.
                      </p>
                      <button className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all">
                         View Integration Docs <IconArrowRight className="w-4 h-4" />
                      </button>
                   </div>

                   {/* Action Cards Grid */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform duration-300">
                         <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 flex items-center justify-center">
                            <span className="font-bold text-xs">CSV</span>
                         </div>
                         <span className="font-medium text-slate-900 dark:text-white">Excel Export</span>
                      </div>
                      <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform duration-300">
                         <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 flex items-center justify-center">
                            <span className="font-bold text-xs">CRM</span>
                         </div>
                         <span className="font-medium text-slate-900 dark:text-white">CRM Sync</span>
                      </div>
                      <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-3 col-span-2 bg-gradient-to-r from-white to-orange-50 dark:from-[#1A1F2E] dark:to-[#2A1810]">
                         <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center">
                            <IconPhone className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Direct Dial</span>
                            <span className="text-xs text-slate-500">Verified Numbers Only</span>
                         </div>
                      </div>
                   </div>
                </div>
            </div>
         </div>
      </section>
   );
};

export default Features;
