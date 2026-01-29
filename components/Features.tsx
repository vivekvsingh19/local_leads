
import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconGlobe, IconFileDown, IconPhone, IconZap } from './Icons';

const Features: React.FC = () => {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
         }
      }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }
      }
   };

   return (
      <section id="features" className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
         {/* Subtle Background Gradient */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/5 via-transparent to-blue-500/5 rounded-full blur-3xl"></div>
         </div>

         <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-24">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8"
               >
                  <IconZap className="w-4 h-4" />
                  <span>Unfair Advantage</span>
               </motion.div>

               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
               >
                  Everything you need to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">
                     dominate your local market.
                  </span>
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
               >
                  No scripts. No proxies. No headaches. Just a powerful engine that prints leads while you sleep.
               </motion.p>
            </div>

            {/* Feature Grid - Modern SaaS Style */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="space-y-20"
            >
               {/* Feature 1: Hyper-Local Targeting */}
               <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="flex-1 order-2 lg:order-1">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                           <IconMapPin className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Precision</span>
                     </div>
                     <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Hyper-Local Targeting</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                        Drill down to specific zip codes or neighborhoods. Our engine scans thousands of data points from Google Maps in seconds, finding businesses even if they're hidden.
                     </p>
                     <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-500">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Zip Code Level</span>
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Neighborhood Scan</span>
                     </div>
                  </div>
                  <div className="flex-1 order-1 lg:order-2 w-full">
                     <div className="relative aspect-square max-w-sm mx-auto">
                        {/* Radar Animation */}
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-0"
                        >
                           <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left bg-gradient-to-r from-primary-500/60 to-transparent -translate-y-1/2"></div>
                        </motion.div>
                        {/* Rings */}
                        <div className="absolute inset-[15%] border border-slate-200 dark:border-white/10 rounded-full"></div>
                        <div className="absolute inset-[30%] border border-slate-200 dark:border-white/10 rounded-full"></div>
                        <div className="absolute inset-[45%] border border-slate-200 dark:border-white/10 rounded-full"></div>
                        {/* Center Dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full shadow-[0_0_20px_rgba(255,85,0,0.6)]"></div>
                        {/* Detected Points */}
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-[25%] left-[60%] w-2 h-2 bg-blue-500 rounded-full"></motion.div>
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute top-[65%] left-[30%] w-2 h-2 bg-emerald-500 rounded-full"></motion.div>
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute top-[40%] left-[75%] w-2 h-2 bg-orange-500 rounded-full"></motion.div>
                     </div>
                  </div>
               </motion.div>

               {/* Feature 2: Live Verification */}
               <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="flex-1 w-full">
                     <div className="bg-[#0a0a0a] rounded-2xl p-6 font-mono text-sm max-w-md mx-auto lg:mx-0 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                           <span className="text-zinc-500 text-xs">lead_scanner.sh</span>
                           <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between text-green-400">
                              <span>$ verify_url(target)</span>
                              <span className="text-zinc-600">12ms</span>
                           </div>
                           <div className="flex justify-between text-red-400">
                              <span>→ status: 404 NOT FOUND</span>
                              <span className="text-yellow-400">[HOT]</span>
                           </div>
                           <div className="flex justify-between text-blue-400">
                              <span>→ add_to_queue(lead)</span>
                              <span className="text-emerald-400">[OK]</span>
                           </div>
                           <div className="text-zinc-600 mt-2">───────────────────────</div>
                           <div className="text-emerald-400">✓ Lead captured successfully</div>
                        </div>
                     </div>
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
                           <IconGlobe className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Real-Time</span>
                     </div>
                     <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Live Verification</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                        We visit every link in real-time. If it returns a 404 or fails to load, we flag it as a "Hot Lead" instantly. No stale data, ever.
                     </p>
                     <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-500">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> 404 Detection</span>
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Auto-Flagging</span>
                     </div>
                  </div>
               </motion.div>

               {/* Feature 3 & 4: Two Column */}
               <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 lg:gap-16">
                  {/* Instant Export */}
                  <div className="group">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
                           <IconFileDown className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Export</span>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Instant Export</h3>
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        Get formatted CSVs compatible with Excel, Google Sheets, or your CRM in one click. Your data, your way.
                     </p>
                     {/* Progress Visual */}
                     <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-slate-500">Exporting leads...</span>
                           <span className="text-violet-600 dark:text-violet-400 font-medium">87%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                           <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "87%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Direct Contact */}
                  <div className="group">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                           <IconPhone className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Contact</span>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Direct Contact Info</h3>
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        Verified phone numbers and addresses extracted directly from listings. Skip the gatekeepers and close deals faster.
                     </p>
                     {/* Contact Card Visual */}
                     <div className="inline-flex items-center gap-4 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                           <IconPhone className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                           <div className="h-2 w-24 bg-slate-200 dark:bg-white/10 rounded mb-1.5"></div>
                           <div className="h-2 w-16 bg-slate-100 dark:bg-white/5 rounded"></div>
                        </div>
                        <button className="ml-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                           Call
                        </button>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
};

export default Features;
