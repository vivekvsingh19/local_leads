
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
                  className="order-1 lg:order-2 flex justify-center py-12"
               >
                  <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                     {/* Ambient Glow */}
                     <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[60px] animate-pulse"></div>

                     {/* Main Radar Container */}
                     <div className="relative w-full h-full bg-slate-50/50 dark:bg-[#030712]/80 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10">
                        {/* Grid & Circles */}
                        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.1]"></div>
                        {[33, 66, 95].map((size, i) => (
                           <div
                              key={i}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 dark:border-white/5"
                              style={{ width: `${size}%`, height: `${size}%` }}
                           />
                        ))}

                        {/* Axes */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 dark:bg-white/5"></div>
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200 dark:bg-white/5"></div>

                        {/* Sweep Animation */}
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-0"
                        >
                           <div className="w-full h-full bg-[conic-gradient(transparent_270deg,rgba(59,130,246,0.3)_360deg)]" />
                        </motion.div>

                        {/* Center Pulse */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20">
                           <div className="absolute inset-0 animate-ping bg-blue-500 rounded-full opacity-75"></div>
                        </div>

                        {/* Interactive Blips */}
                        {[
                           { top: '30%', left: '60%', delay: 0, color: 'bg-orange-500' },
                           { top: '70%', left: '40%', delay: 1, color: 'bg-emerald-500' },
                           { top: '40%', left: '25%', delay: 2, color: 'bg-indigo-500' },
                        ].map((blip, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                              transition={{ duration: 2, delay: blip.delay, repeat: Infinity }}
                              className={`absolute w-3 h-3 ${blip.color} rounded-full shadow-lg z-10 box-content border-2 border-white dark:border-[#030712]`}
                              style={{ top: blip.top, left: blip.left }}
                           />
                        ))}
                     </div>
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
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                >
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
                </motion.div>

                {/* Action Cards Grid */}
                <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="relative group"
                >
                   {/* Glow */}
                   <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>

                   {/* Main Container */}
                   <div className="relative bg-slate-50/80 dark:bg-[#1A1F2E]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                       {/* Header Bar */}
                       <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/5">
                           <div className="flex items-center gap-2">
                               <div className="w-3 h-3 rounded-full bg-red-400"></div>
                               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                               <div className="w-3 h-3 rounded-full bg-green-400"></div>
                           </div>
                           <div className="text-xs font-mono text-slate-400">export_config_v2.0</div>
                       </div>

                       {/* Content Body */}
                       <div className="p-6 space-y-4">
                           {/* Item 1: Phone Unlocked */}
                           <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-4 p-4 bg-white dark:bg-[#0F1117] rounded-xl border border-slate-200/50 dark:border-white/5 shadow-sm group/item"
                           >
                                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/20 text-green-600 flex items-center justify-center shrink-0">
                                   <IconPhone className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                   <div className="flex items-center justify-between mb-1">
                                       <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Direct Line</div>
                                       <span className="px-2 py-0.5 rounded text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold border border-green-200 dark:border-green-800">UNLOCKED</span>
                                   </div>
                                   <div className="font-mono text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                       <span className="tracking-widest">+1 (555) 867-5309</span>
                                   </div>
                                </div>
                           </motion.div>

                           {/* Item 2: Map Integration */}
                           <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-4 p-4 bg-white dark:bg-[#0F1117] rounded-xl border border-slate-200/50 dark:border-white/5 shadow-sm"
                           >
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
                                   <IconMapPin className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                   <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Google Maps</div>
                                   <div className="text-slate-900 dark:text-white font-medium">One-Click Navigation</div>
                                </div>
                                <div className="hidden sm:block w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 relative overflow-hidden opacity-75">
                                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full box-content border-2 border-white dark:border-[#0F1117]"></div>
                                </div>
                           </motion.div>

                           {/* Item 3: CSV Export */}
                           <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-4 p-4 bg-white dark:bg-[#0F1117] rounded-xl border border-slate-200/50 dark:border-white/5 shadow-sm"
                           >
                                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center shrink-0">
                                   <div className="font-bold text-sm">CSV</div>
                                </div>
                                <div className="flex-1">
                                   <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Data Export</div>
                                   <div className="text-slate-900 dark:text-white font-medium">Excel Compatible</div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <IconFileDown className="w-4 h-4 text-slate-400" />
                                </div>
                           </motion.div>
                       </div>
                   </div>
                </motion.div>
            </div>
         </div>
      </section>
   );
};

export default Features;
