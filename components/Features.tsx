
import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconGlobe, IconFileDown, IconPhone } from './Icons';

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
         <div className="max-w-7xl mx-auto px-6 sm:px-8">

            <div className="max-w-3xl mx-auto text-center mb-20">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
               >
                  Everything you need to <br /> <span className="text-primary-500">dominate your local market.</span>
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
               >
                  No scripts. No proxies. No headaches. Just a powerful engine that prints leads.
               </motion.p>
            </div>

            {/* Bento Grid Layout */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-50px" }}
               className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]"
            >

               {/* Card 1: Large Span - Map Scanning */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 rounded-[2.5rem] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-8 md:p-12 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none"
               >
                  <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-slate-50 dark:from-[#131b31] to-transparent z-0"></div>
                  <div className="relative z-10 h-full flex flex-col">
                     <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                        <IconMapPin className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Hyper-Local Targeting</h3>
                     <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8 text-lg leading-relaxed">
                        Drill down to specific zip codes or neighborhoods. If it's on Google Maps, we find it. Our engine scans thousands of data points in seconds.
                     </p>

                     {/* Visual: Map Interface */}
                     <div className="mt-auto relative w-full h-48 bg-slate-100 dark:bg-[#0B1121] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-97.7431,30.2672,13,0/600x400@2x?access_token=YOUR_TOKEN')] bg-cover opacity-20 dark:opacity-40 grayscale"></div>
                        <motion.div
                           animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                           transition={{ duration: 3, repeat: Infinity }}
                           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary-500/30 rounded-full flex items-center justify-center"
                        >
                           <div className="w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_20px_#FD6B2E]"></div>
                        </motion.div>
                        {/* Map Pins */}
                        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                     </div>
                  </div>
               </motion.div>

               {/* Card 2: Vertical - Live Check */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-1 rounded-[2.5rem] bg-slate-900 dark:bg-gradient-to-b dark:from-[#1e293b] dark:to-[#0f172a] p-8 border border-transparent dark:border-white/5 relative overflow-hidden text-white flex flex-col shadow-2xl"
               >
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                  <div className="relative z-10 flex flex-col h-full">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
                        <IconGlobe className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Live Verification</h3>
                     <p className="text-slate-400 mb-8 leading-relaxed">
                        We visit every link in real-time. If it returns a 404 or fails to load, we flag it as a hot lead.
                     </p>

                     {/* Visual: Code/Terminal */}
                     <div className="mt-auto bg-black/50 rounded-xl p-4 font-mono text-xs text-green-400 space-y-2 border border-white/10">
                        <div className="flex justify-between">
                           <span>{'>'} check_url(target)</span>
                           <span className="text-slate-500">20ms</span>
                        </div>
                        <div className="flex justify-between text-red-400">
                           <span>{'>'} status: 404</span>
                           <span>[FAIL]</span>
                        </div>
                        <div className="flex justify-between text-blue-400">
                           <span>{'>'} add_to_list()</span>
                           <span>[OK]</span>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Card 3: Vertical - Data Export */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-1 rounded-[2.5rem] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-8 flex flex-col relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none"
               >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                     <IconFileDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">One-Click Export</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                     Compatible with Excel, Google Sheets, or your CRM. Get organized data instantly.
                  </p>

                  {/* Visual: Spreadsheet */}
                  <div className="mt-auto relative w-full h-32 bg-slate-50 dark:bg-[#0B1121] rounded-xl border border-slate-200 dark:border-white/5 p-2 flex flex-col gap-2 group-hover:scale-105 transition-transform duration-300 origin-bottom">
                     <div className="flex gap-2">
                        <div className="w-1/3 h-2 bg-slate-200 dark:bg-white/10 rounded"></div>
                        <div className="w-1/3 h-2 bg-slate-200 dark:bg-white/10 rounded"></div>
                        <div className="w-1/3 h-2 bg-slate-200 dark:bg-white/10 rounded"></div>
                     </div>
                     {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-2 opacity-50">
                           <div className="w-full h-4 bg-slate-100 dark:bg-white/5 rounded"></div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* Card 4: Large Span - Contact Info */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white dark:from-[#0f172a] dark:to-[#0B1121] border border-slate-200 dark:border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none"
               >
                  <div className="flex-1">
                     <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                        <IconPhone className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Direct Contact Info</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        We scrape the public phone number and address directly from the listing, so you can pick up the phone and close the deal immediately.
                     </p>
                  </div>

                  <div className="w-full md:w-1/2 relative h-48">
                     {/* Visual: Floating Card */}
                     <motion.div
                        whileHover={{ y: -5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-2xl border border-slate-100 dark:border-white/5 z-20"
                     >
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                           <div className="space-y-2">
                              <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                              <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                           </div>
                        </div>
                        <div className="w-full h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary-500/20">
                           Call Business
                        </div>
                     </motion.div>

                     {/* Decorative background blobs */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full"></div>
                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
                  </div>
               </motion.div>

            </motion.div>
         </div>
      </section>
   );
};

export default Features;
