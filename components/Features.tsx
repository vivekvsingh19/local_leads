
import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconGlobe, IconFileDown, IconPhone, IconZap, IconShield } from './Icons';

const Features: React.FC = () => {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
         }
      }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
      }
   };

   return (
      <section id="features" className="py-32 bg-slate-50 dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
         </div>

         <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

            <div className="max-w-3xl mx-auto text-center mb-20">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-8 border border-primary-200 dark:border-primary-500/30 shadow-sm"
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
                  Everything you need to <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-500 dark:from-primary-400 dark:to-orange-400 leading-tight">
                     dominate your local market.
                  </span>
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
               >
                  No scripts. No proxies. No headaches. Just a powerful engine that prints leads while you sleep.
               </motion.p>
            </div>

            {/* Bento Grid Layout - Redesigned */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-50px" }}
               className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]"
            >
               {/* Card 1: Map Scanning (Large Span) */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 rounded-[2rem] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-8 md:p-10 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center"
               >
                  <div className="flex-1 space-y-4 z-10">
                     <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                        <IconMapPin className="w-7 h-7" />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hyper-Local Targeting</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        Drill down to specific zip codes or neighborhoods. Our engine scans thousands of data points from Google Maps in seconds, finding businesses even if they're hidden.
                     </p>
                  </div>
                  
                  <div className="flex-1 w-full h-48 md:h-64 bg-slate-100 dark:bg-[#0B1121] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500">
                     <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-100/90 dark:from-[#0B1121]/90 to-transparent"></div>
                     <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary-500/30 rounded-full flex items-center justify-center"
                     >
                        <div className="w-3 h-3 bg-primary-500 rounded-full shadow-[0_0_20px_#FF5500]"></div>
                     </motion.div>
                     {/* Map Pins */}
                     <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full shadow-lg border-2 border-white dark:border-[#0B1121] animate-bounce delay-100"></div>
                     <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-orange-500 rounded-full shadow-lg border-2 border-white dark:border-[#0B1121] animate-bounce delay-300"></div>
                     <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-lg border-2 border-white dark:border-[#0B1121] animate-bounce delay-500"></div>
                  </div>
               </motion.div>

               {/* Card 2: Live Verification (Vertical) */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-1 rounded-[2rem] bg-slate-900 dark:bg-[#1e293b] p-8 relative overflow-hidden text-white flex flex-col shadow-2xl group border border-slate-800 dark:border-white/10"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-900/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full pointer-events-none"></div>

                  <div className="relative z-10">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
                        <IconGlobe className="w-7 h-7 text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Live Verification</h3>
                     <p className="text-slate-300 mb-8 text-base leading-relaxed">
                        We visit every link in real-time. If it returns a 404 or fails to load, we flag it as a "Hot Lead" instantly.
                     </p>
                  </div>

                  {/* Terminal Visual */}
                  <div className="mt-auto bg-black/80 rounded-xl p-4 font-mono text-xs text-green-400 space-y-2 border border-white/10 shadow-lg relative group-hover:translate-y-[-5px] transition-transform duration-300">
                     <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                        <span className="text-slate-400">scanner.exe</span>
                        <div className="flex gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                     </div>
                     <div className="flex justify-between">
                        <span>{'>'} check_status(target)</span>
                        <span className="text-slate-500">24ms</span>
                     </div>
                     <div className="flex justify-between text-red-400">
                        <span>{'>'} detected: 404 error</span>
                        <span>[HOT]</span>
                     </div>
                     <div className="flex justify-between text-blue-400">
                        <span>{'>'} saving_lead()</span>
                        <span>[OK]</span>
                     </div>
                  </div>
               </motion.div>

               {/* Card 3: One Click Export */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-1 rounded-[2rem] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
               >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                     <IconFileDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Export</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                     Get formatted CSVs compatible with Excel, Google Sheets, or your CRM in one click.
                  </p>
                  <div className="flex gap-2">
                     <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
                     </div>
                  </div>
               </motion.div>

               {/* Card 4: Contact Info (Wide) */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 rounded-[2rem] bg-gradient-to-br from-orange-50 to-white dark:from-[#1c130e] dark:to-[#0f172a] border border-orange-100 dark:border-orange-500/10 p-8 relative overflow-hidden group flex items-center justify-between gap-6"
               >
                  <div className="max-w-xs z-10">
                     <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                        <IconPhone className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Direct Contact Info</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Verified phone numbers and addresses extracted directly from listings. Skip the gatekeepers.
                     </p>
                  </div>
                  
                  {/* Floating Contact Card Visual */}
                  <div className="hidden sm:block relative w-48 h-32 flex-shrink-0">
                      <motion.div
                        whileHover={{ y: -5, rotate: 2 }}
                        className="absolute inset-0 bg-white dark:bg-[#1e293b] rounded-xl shadow-xl border border-slate-100 dark:border-white/5 p-4 flex flex-col justify-center"
                      >
                         <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                               <IconPhone className="w-4 h-4 text-orange-500" />
                            </div>
                            <div className="h-2 w-20 bg-slate-100 dark:bg-slate-700 rounded"></div>
                         </div>
                         <div className="w-full h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-900 text-xs font-bold">
                            Click to Call
                         </div>
                      </motion.div>
                  </div>
               </motion.div>

            </motion.div>
         </div>
      </section>
   );
};

export default Features;
