
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
                     <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                        <IconMapPin className="w-7 h-7" />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hyper-Local Targeting</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        Drill down to specific zip codes or neighborhoods. Our engine scans thousands of data points from Google Maps in seconds, finding businesses even if they're hidden.
                     </p>
                  </div>

                  <div className="flex-1 w-full h-48 md:h-64 bg-slate-50 dark:bg-white/5 rounded-3xl relative transition-transform duration-500 flex items-center justify-center">
                     {/* Clean Radar Visual */}
                     <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-40 h-40 border border-orange-500/20 rounded-full flex items-center justify-center"
                     />
                     <motion.div
                        animate={{ scale: [0.8, 1, 0.8], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute w-24 h-24 bg-orange-500/5 rounded-full"
                     />

                     {/* Dots */}
                     <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10"
                     />
                     <motion.div
                        animate={{ x: [20, 25, 20], y: [-20, -25, -20] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-500 rounded-full opacity-80"
                     />
                     <motion.div
                        animate={{ x: [-30, -35, -30], y: [10, 15, 10] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-500 rounded-full opacity-80"
                     />
                  </div>
               </motion.div>

               {/* Card 2: Live Verification (Vertical) */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-1 rounded-[2rem] bg-[#111111] dark:bg-[#000000] p-8 relative overflow-hidden text-white flex flex-col shadow-2xl group border border-zinc-800"
               >
                  <div className="relative z-10">
                     <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/5">
                        <IconGlobe className="w-7 h-7 text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Live Verification</h3>
                     <p className="text-zinc-400 mb-8 text-base leading-relaxed">
                        We visit every link in real-time. If it returns a 404 or fails to load, we flag it as a "Hot Lead" instantly.
                     </p>
                  </div>

                  {/* Terminal Visual - Matching Screenshot */}
                  <div className="mt-auto bg-black rounded-lg p-4 font-mono text-xs text-green-400 space-y-3 border border-zinc-800">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-zinc-500">scanner.exe</span>
                        <div className="flex gap-1.5">
                           <div className="w-2 h-2 rounded-full bg-red-500"></div>
                           <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                           <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-green-400">{'>'} check_status(target)</span>
                        <span className="text-zinc-600">24ms</span>
                     </div>
                     <div className="flex justify-between text-red-400 font-semibold">
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
                  className="md:col-span-1 rounded-[2rem] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
               >
                  <div>
                     <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                        <IconFileDown className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Instant Export</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Get formatted CSVs compatible with Excel, Google Sheets, or your CRM in one click.
                     </p>
                  </div>
                  <div className="flex gap-2 mt-6">
                     <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
                     </div>
                  </div>
               </motion.div>

               {/* Card 4: Contact Info (Wide) */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 rounded-[2rem] bg-[#FFF8F3] dark:bg-[#1c130e] border border-orange-100 dark:border-orange-500/10 p-8 relative overflow-hidden group flex flex-col md:flex-row items-center justify-between gap-6"
               >
                  <div className="max-w-md z-10">
                     <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                        <IconPhone className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Direct Contact Info</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Verified phone numbers and addresses extracted directly from listings. Skip the gatekeepers.
                     </p>
                  </div>

                  {/* Visual based on Screenshot: Floating Call Card */}
                  <div className="relative w-full max-w-[200px]">
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-white/5 p-4"
                      >
                         <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                               <IconPhone className="w-4 h-4 text-orange-500" />
                            </div>
                            <div className="h-2 w-16 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                         </div>
                         <button className="w-full py-2 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
                            Click to Call
                         </button>
                      </motion.div>
                  </div>
               </motion.div>            </motion.div>
         </div>
      </section>
   );
};

export default Features;
